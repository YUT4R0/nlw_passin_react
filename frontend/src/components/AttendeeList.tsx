import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useState } from "react";
import { attendees } from "../data/attendees";
import { IconButton } from "./IconButton";
import { Table } from "./table/Table";
import { TableCell } from "./table/TableCell";
import { TableHeader } from "./table/TableHeader";
import { TableRow } from "./table/TableRow";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function AttendeeList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(attendees.length / 10);

  const onSearchInput = (value: string) => setSearch(value);
  const goToNextPage = () => setPage(page + 1);
  const goToPreviousPage = () => setPage(page - 1);
  const goToLastPage = () => setPage(totalPages);
  const goToFirstPage = () => setPage(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <div className="font-bold text-2xl">Participantes</div>
        <div className="px-3 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm w-72 flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            type="text"
            placeholder="Buscar participante..."
            className="bg-transparent flex-1 outline-none text-sm border-0 p-0"
            onChange={(e) => onSearchInput(e.target.value)}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                name=""
                id=""
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees
            .slice((page - 1) * 10, page * 10)
            .map(({ name, id, email, createdAt, checkedInAt }) => (
              <TableRow key={id}>
                <TableCell>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="size-4 bg-black/20 rounded border border-white/10"
                  />
                </TableCell>
                <TableCell>{id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{name}</span>
                    <span>{email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(createdAt)}</TableCell>
                <TableCell>{dayjs().to(checkedInAt)}</TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell
              className="py-3 px-4 text-sm text-zinc-300 text-left"
              colSpan={3}
            >
              Mostrando 10 de {attendees.length} itens
            </TableCell>
            <TableCell
              className="py-3 px-4 text-sm text-zinc-300 text-right"
              colSpan={3}
            >
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
