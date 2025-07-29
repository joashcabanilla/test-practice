import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

//Types
import { Member } from "@/lib/types";

//shadcn component
import { Badge } from "@/components/ui/badge";

//icons
import { CircleCheck, CircleAlert, CircleSlash } from "lucide-react";

import { formatMobileNumber } from "@/lib/utils";

const emptyCell = <p className="text-muted-foreground">-</p>;

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return row.original.name ? <p className="text-[#FBBD2C]">{row.original.name}</p> : emptyCell;
    }
  },
  {
    accessorKey: "verificationStatus",
    header: "Verification Status",
    cell: ({ row }) => {
      switch (row.original.verificationStatus) {
        case "VERIFIED":
          return (
            <Badge variant="verified">
              <div className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
              Verified
            </Badge>
          );
        case "UNVERIFIED":
          return (
            <Badge variant="unverified">
              <div className="h-1.5 w-1.5 rounded-full bg-[#F63D68]" />
              Unverified
            </Badge>
          );

        case "PENDING":
          return (
            <Badge variant="pending">
              <div className="h-1.5 w-1.5 rounded-full bg-[#EF6820]" />
              Pending
            </Badge>
          );
        default:
          return emptyCell;
      }
    }
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      return row.original.wallet?.balance ? (
        <p className="text-muted-foreground">
          {parseFloat(row.original.wallet?.balance).toFixed(2)}
        </p>
      ) : (
        emptyCell
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell: ({ row }) => {
      return row.original.emailAddress ? (
        <p className="text-muted-foreground">{row.original.emailAddress}</p>
      ) : (
        emptyCell
      );
    }
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
    cell: ({ row }) => {
      return row.original.mobileNumber ? (
        <p className="text-muted-foreground">{formatMobileNumber(row.original.mobileNumber)}</p>
      ) : (
        emptyCell
      );
    }
  },
  {
    accessorKey: "domain",
    header: "Domain",
    cell: ({ row }) => {
      return row.original.domain ? (
        <p className="text-muted-foreground">{row.original.domain}</p>
      ) : (
        emptyCell
      );
    }
  },
  {
    accessorKey: "dateRegistered",
    header: "Date Registered",
    cell: ({ row }) => {
      return row.original.dateTimeCreated ? (
        <p className="text-muted-foreground">
          {format(row.original.dateTimeCreated, "yyyy MMM dd")}
        </p>
      ) : (
        emptyCell
      );
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      switch (row.original.status) {
        case "ACTIVE":
          return (
            <Badge variant="active">
              <CircleCheck strokeWidth={3} size={15} className="text-[#17B26A]" />
              Active
            </Badge>
          );
        case "BLACKLISTED":
          return (
            <Badge variant="blacklisted">
              <CircleAlert strokeWidth={3} size={15} className="text-[#F04438]" />
              Blacklisted
            </Badge>
          );

        case "DISABLED":
          return (
            <Badge variant="disabled">
              <CircleSlash strokeWidth={3} size={15} className="text-[#85888E]" />
              Disabled
            </Badge>
          );
        case "SUSPENDED":
          return (
            <Badge variant="disabled">
              <CircleSlash strokeWidth={3} size={15} className="text-[#85888E]" />
              Suspended
            </Badge>
          );
        default:
          return emptyCell;
      }
    }
  },
  {
    accessorKey: "dateTimeLastActive",
    header: "Date and Time Last Active ",
    cell: ({ row }) => {
      return row.original.dateTimeLastActive ? (
        <p className="text-muted-foreground">
          {format(row.original.dateTimeLastActive, "yyyy MMM dd hh:mm a")}
        </p>
      ) : (
        emptyCell
      );
    }
  }
];
