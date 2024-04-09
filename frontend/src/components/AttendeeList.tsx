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
import { useEffect, useState } from "react";
import { IconButton } from "./IconButton";
import { Table, TableCell, TableHeader, TableRow } from "./table";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface AttendeeProps {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

interface DataProps {
  attendees: AttendeeProps[];
  total: number;
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });

  const [total, setTotal] = useState(0);
  const [attendees, setAttendees] = useState<AttendeeProps[]>([]);

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const eventId = "9e9bd979-9d10-4915-b339-3786b1634f33";
    const url = new URL(`http://localhost:3333/events/${eventId}/attendees`);

    url.searchParams.set("pageIndex", String(page - 1));
    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then<DataProps>((res) => res.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url);
    setPage(page);
  }

  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () => setCurrentPage(page - 1);
  const goToNextPage = () => setCurrentPage(page + 1);
  const goToLastPage = () => setCurrentPage(totalPages);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set("search", search);
    window.history.pushState({}, "", url);
    setSearch(search);
  }

  function onSearchInput(value: string) {
    setCurrentSearch(value);
    setCurrentPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <div className="font-bold text-2xl">Participantes</div>
        <div className="px-3 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm w-72 flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            type="text"
            placeholder="Buscar participante..."
            className="bg-transparent flex-1 outline-none text-sm border-0 p-0 focus:ring-0"
            onChange={(e) => onSearchInput(e.target.value)}
            value={search}
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
          {attendees.map(({ name, id, email, createdAt, checkedInAt }) => (
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
              <TableCell>
                {checkedInAt === null ? (
                  <span className="text-zinc-500">Não fez check-in</span>
                ) : (
                  dayjs().to(checkedInAt)
                )}
              </TableCell>
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
              Mostrando {attendees.length} de {total} itens
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
