import { useState } from "react";
import { Button } from "components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/Table";
import { ScrollArea } from "components/ui/ScrollArea";

export const ExcelPreviewTable = ({ headers, rows }) => {
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const displayRows = rows.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <div className="rounded-lg border bg-card">
      {/* <ScrollArea className="w-full h-[500px] overflow-auto">
        <div className="min-w-max">
          <Table>
            <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur z-10">
              <TableRow>
                <TableHead className="w-12 font-semibold text-center bg-muted">
                  #
                </TableHead>
                {headers.map((header, index) => (
                  <TableHead key={index} className="font-semibold bg-muted">
                    {header || `Column ${index + 1}`}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayRows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="text-center text-muted-foreground font-medium w-12 bg-muted/30">
                    {page * rowsPerPage + rowIndex + 1}
                  </TableCell>
                  {headers.map((_, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="max-w-[300px] truncate"
                    >
                      {row[colIndex] !== undefined && row[colIndex] !== null
                        ? String(row[colIndex])
                        : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea> */}

      <ScrollArea className="w-full h-[500px] overflow-auto">
        <Table className="min-w-max table-auto">
          <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur z-10">
            <TableRow>
              <TableHead className="w-12 text-center bg-muted">#</TableHead>
              {headers.map((header, index) => (
                <TableHead key={index} className="bg-muted whitespace-nowrap">
                  {header || `Column ${index + 1}`}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell className="w-12 text-center bg-muted/30">
                  {page * rowsPerPage + rowIndex + 1}
                </TableCell>
                {headers.map((_, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="max-w-[300px] truncate whitespace-nowrap"
                  >
                    {row[colIndex] ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>


      {/* Pagination footer */}
      <div className="flex justify-end p-3 border-t bg-muted/30 text-sm text-muted-foreground">
        {/* Left side: showing info */}
        <span>
          Showing {(page * rowsPerPage) + 1}–{Math.min((page + 1) * rowsPerPage, rows.length)} of {rows.length} rows
        </span>

        {/* Right side: pagination buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-xs text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
