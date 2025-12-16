import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import Spinner from "../components/ui/Spinner";

import { FileUploadZone } from "../components/bulkload/FileUploadZone";
import { ExcelPreviewTable } from "../components/bulkload/ExcelPreviewTable";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useToast } from "hooks/useToast";
import SideBarWrapper from "components/SideBarWrapper";
import Navbar from "layout/Navbar";
import { getAAPBaselineAndTargetPayload, getAAPPayload, getBillingPayload, getBudgetPayload, getGeneralDistrictPayload, getMandatoryFieldByTracker, getMissingMandatoryFieldsMessage, getProjectPayload, getOperationalHealthFacilityPayload, getSportFacilityPayload, getServiceProvidersPayload, getSchoolProfilePayload, getMeetingsPayload, getPeopleWithDisabilityPayload, getProgramPayload } from "utils/bulkload";
import axios from "api/axios";
import useAuth from "hooks/useAuth";
import Select from "react-select";
import { message } from "antd";

const BulkLoad = () => {
  const { user } = useAuth();
  const [districts, setDistricts] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if districts exist in localStorage
    const storedDistricts = localStorage.getItem("districts");
    getTrackers();

    if (storedDistricts) {
      const data = JSON.parse(storedDistricts);

      // Collect all district IDs into a Set
      const districtIds = new Set(user?.user?.districts?.map(d => d.id));

      // Filter options by matching district IDs
      const filteredOptions =
        user?.user?.userRoles?.find(role => role.name === "Superuser") ?
          data : data.filter(opt => districtIds.has(opt.value.id));
      setDistricts(filteredOptions);

    }
  }, []);


  function getTrackers() {
    axios
      .get('/programs?paging=false&fields=id,displayName,trackedEntityType[id,displayName]')
      .then(result => {
        const trackers = result.data.programs;
        const temp = [];

        trackers.forEach(tracker => {

          const tempData = { value: { trackerId: tracker.id, entityTypeId: tracker.trackedEntityType.id }, label: tracker.displayName };
          temp.push(tempData);
        });

        setPrograms(temp);
      })
      .catch(err => console.log(err))
  }

  const handleFile = async (file) => {
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const trackerData = XLSX.utils.sheet_to_json(workbook.Sheets["TEI Instances"]);

      const headerRow = trackerData[0];
      const headers = Object.values(headerRow)
        .map(h =>
          String(h)
            .replace(/\r?\n/g, " ")
            .replace(/\(.*?\)/g, "")
            .replace(/\*/g, "")
            .trim()
        )
        .filter(h => h !== "No geometry" && h !== "District Logo");

      // Build a mapping of which keys correspond to which headers
      const headerMap = Object.entries(headerRow).reduce((acc, [key, value]) => {
        const cleanHeader = String(value)
          .replace(/\r?\n/g, " ")
          .replace(/\(.*?\)/g, "")
          .replace(/\*/g, "")
          .trim();
        if (cleanHeader !== "No geometry" && cleanHeader !== "District Logo") {
          acc[key] = cleanHeader;
        }
        return acc;
      }, {});

      // Extract and align data
      const dataRows = trackerData.slice(1);

      const rows = dataRows.map(row =>
        headers.map(header => {
          // find the corresponding key for this header
          const matchingKey = Object.entries(headerMap).find(
            ([, value]) => value === header
          )?.[0];
          return matchingKey ? row[matchingKey] ?? "-" : "-";
        })
      );

      if (rows.length === 0) {
        throw new Error("Empty spreadsheet");
      }

      setExcelData({
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(2) + " KB",
        headers,
        rows,
        rowCount: rows.length,
        columnCount: headers.length,
      });

      toast({
        title: "File loaded successfully",
        description: `${rows.length} rows and ${headers.length} columns imported`,
      });
    } catch (error) {
      toast({
        title: "Error parsing file",
        description: "There was an error reading the Excel file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleBulkLoad = () => {
    if (!excelData) return;

    setIsImporting(true); // ⬅️ Start spinner

    const orgUnit = selectedDistrict?.value;
    const tracker = selectedProgram?.value.trackerId;
    const trackedEntity = selectedProgram?.value.entityTypeId;

    if (!excelData.fileName.includes(selectedProgram?.label)) {
      message.error("Selected program must not be different from uploaded template");
      setIsImporting(false);
      return;
    }

    if (!orgUnit || !tracker || !trackedEntity) {
      message.error("District and Tracker must be selected to upload data");
      setIsImporting(false);
      return;
    }

    let payload = [];
    let fields = [];


    if (selectedProgram?.label?.includes("Plan Baselines and Targets")) {

      payload = getAAPBaselineAndTargetPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Annual Action Plan Baselines and Targets")

    } else if (selectedProgram?.label?.includes("Annual Action Plan")) {

      payload = getAAPPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Annual Action Plan (AAP)")

    } else if (selectedProgram?.label?.includes("District General Tracker")) {

      payload = getGeneralDistrictPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("District General Tracker")

    } else if (selectedProgram?.label?.includes("Projects & Programmes")) {

      payload = getProjectPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Projects & Programmes Register (P&P)")
    } else if (selectedProgram?.label?.includes("Bill Tracker")) {

      payload = getBillingPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Bill Tracker")

    } else if (selectedProgram?.label?.includes("Budget Allocation Tracker")) {

      payload = getBudgetPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Budget Allocation Tracker")

    } else if (selectedProgram?.label?.includes("Operational Health Facility Tracker")) {

      payload = getOperationalHealthFacilityPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Operational Health Facility Tracker")

    } else if (selectedProgram?.label?.includes("Sport Facility Tracker")) {

      payload = getSportFacilityPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Sport Facility Tracker")

    } else if (selectedProgram?.label?.includes("Service Providers")) {

      payload = getServiceProvidersPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Service Providers Tracker")

    } else if (selectedProgram?.label?.includes("School Profile Tracker")) {

      payload = getSchoolProfilePayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("School Profile Tracker")

    } else if (selectedProgram?.label?.includes("Meetings Tracker")) {

      payload = getMeetingsPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Meetings Tracker")
     }
     else if (selectedProgram?.label?.includes("PWD People With  Disability")) {

      payload = getPeopleWithDisabilityPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("People With Disability Tracker")
     }
     else if (selectedProgram?.label?.includes("Program Tracker")) {

      payload = getProgramPayload(excelData.rows, orgUnit, tracker, trackedEntity);
      fields = getMandatoryFieldByTracker("Program Tracker")
     }

    const messages = getMissingMandatoryFieldsMessage(fields, payload.trackedEntities);

    if (messages.includes("Missing fields")) {
      alert(messages);
      setIsImporting(false);
      return;
    }

    axios.post(
      '/tracker?async=true&importStrategy=CREATE_AND_UPDATE&skipRuleEngine=true&skipAudit=true',
      payload
    )
      .then((response) => {
        const jobId = response?.data?.response?.id;

        if (!jobId) {
          throw new Error("❌ No job ID returned from DHIS2.");
        }

        // Poll job status every few seconds
        const interval = setInterval(() => {
          axios.get(`/tracker/jobs/${jobId}/report`)
            .then((resp) => {
              const status = resp.data;

              if (status.status === "ERROR") {
                let userFeedback = "Could not upload the data, kindly verify the data and try again";
                const errorMessage = status?.validationReport?.errorReports?.[0]?.message;

                if (errorMessage?.includes("Non-unique attribute value")) {
                  userFeedback = errorMessage;
                }

                message.error(userFeedback);
              }

              if (status.status === "OK") {
                message.success("Data Uploaded Successfully");
                handleClear();
              }

              // ✅ Stop polling once job finishes successfully or fails
              if (["COMPLETED", "ERROR", "OK"].includes(status.status)) {
                clearInterval(interval);
                setIsImporting(false); // ⬅️ Stop spinner
              }
            })
            .catch((err) => {
              if (err.response?.status !== 404) {
                console.error("Error fetching job report:", err);
                clearInterval(interval);
                setIsImporting(false); // ⬅️ Stop spinner
              }
            });
        }, 3000);
        // Check every 3 seconds
      })
      .catch((error) => {
        console.error("❌ DHIS2 import failed:", error);
        const feedbackMessage = error?.response?.data?.message;
        message.error(feedbackMessage?.split(",")[0]);

        setIsImporting(false); // ⬅️ Stop spinner
      });

    toast({
      title: "Data imported successfully",
      description: `${excelData.rowCount} rows have been loaded`,
    });
  };

  const handleClear = () => {
    setExcelData(null);
  };

  return (
      <div className="page-wrapper flex min-h-screen bg-gray-50">
        <SideBarWrapper />
        <div className="page-content flex-1 flex flex-col">
          <Navbar />

          {/* Header */}
          {/* Page header start */}
          <div className="page-header">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item active">DDDP Bulk Load Interface </li>
            </ol>

          </div>
          {/* Page header end */}

          {/* Main */}
          <div className="main-container flex-1 p-8 bg-gray-50 overflow-y-auto">
            <div className="row gutters mb-3">

              {districts && <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Select
                  onChange={(val) => {
                    setSelectedDistrict({ value: val.value.id, label: val.label });
                  }}
                  options={districts}
                  isSearchable
                  placeholder='Select District'
                />
              </div>}

              {programs && <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Select
                  onChange={setSelectedProgram}
                  options={programs}
                  isSearchable
                  placeholder='Select Program'
                />
              </div>}

            </div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
                <FileSpreadsheet className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Excel Bulk Importer
              </h2>
              <p className="text-gray-500 text-base max-w-2xl mx-auto">
                Drag and drop your Excel file below or select from your computer.
              </p>
            </div>

            {!excelData ? (
              <FileUploadZone
                isDragOver={isDragOver}
                isLoading={isLoading}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onFileInput={handleFileInput}
              />
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                <Card className="p-6 border-2 border-gray-200 bg-white shadow-md rounded-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          {excelData.fileName}
                        </h2>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>Size: {excelData.fileSize}</span>
                          <span>•</span>
                          <span>{excelData.rowCount} rows</span>
                          <span>•</span>
                          <span>{excelData.columnCount} columns</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleClear}>
                      Clear
                    </Button>
                    <Button variant="outline" onClick={handleBulkLoad} disabled={isImporting}>
                      {isImporting ? (
                        <>
                          <Spinner size="xs" className="mr-2" />
                          Importing...
                        </>
                      ) : (
                        <>
                          <Upload className="w-3 h-3 mr-2" />
                          Import Data
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <ExcelPreviewTable
                      headers={excelData.headers}
                      rows={excelData.rows}
                    />
                  </div>

                  <div className="mt-6 flex gap-3 justify-end">



                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default BulkLoad;
