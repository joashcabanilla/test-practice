import { useEffect, useMemo } from "react";
import { FilterSelect } from "@/components/filters/filter-select";
import { FilterStatus } from "@/components/filters/filter-status";
import { FilterDate } from "@/components/filters/filter-date";
import { DateTimeRange } from "@/components/filters/datetime-range";
import { Member } from "@/lib/types";

//global state
import { useFilterState } from "@/store/filter-store";

//GraphQL hooks
import { useGetVerificationStatus, useGetStatus } from "@/graphQL/hooks";

interface FilterTableProps {
  members: Member[] | [];
}

export function FilterTable({ members }: FilterTableProps) {
  const {
    nameList,
    verificationStatusList,
    emailList,
    mobileNumberList,
    domainList,
    dateRegistered,
    StatusList,
    dateTimeLastActiveFrom,
    dateTimeLastActiveTo,
    setfilterMemberList,
    setNameList,
    setVerificationStatusList,
    setEmailList,
    setMobileNumberList,
    setDomainList,
    setDateRegistered,
    setStatusList,
    setDateTimeLastActiveFrom,
    setDateTimeLastActiveTo
  } = useFilterState();

  const filteredMembers = useMemo(() => {
    return members
      .filter((member) => (nameList.length > 0 ? nameList.includes(member.name) : true))
      .filter((member) =>
        verificationStatusList ? member.verificationStatus === verificationStatusList : true
      )
      .filter((member) => (emailList.length > 0 ? emailList.includes(member.emailAddress) : true))
      .filter((member) =>
        mobileNumberList.length > 0 ? mobileNumberList.includes(member.mobileNumber) : true
      )
      .filter((member) => (domainList.length > 0 ? domainList.includes(member.domain) : true))
      .filter((member) => {
        if (dateRegistered.from || dateRegistered.to) {
          const memberRegisteredDate = new Date(member.dateTimeCreated);
          const fromDate = dateRegistered.from ? new Date(dateRegistered.from) : undefined;
          const toDate = dateRegistered.to ? new Date(dateRegistered.to) : undefined;
          if (fromDate && memberRegisteredDate < fromDate) return false;
          if (toDate && memberRegisteredDate > toDate) return false;
        }
        return true;
      })
      .filter((member) => (StatusList ? member.status === StatusList : true))
      .filter((member) => {
        if (dateTimeLastActiveFrom || dateTimeLastActiveTo) {
          const memberRegisteredDate = new Date(member.dateTimeLastActive);
          const fromDate = dateTimeLastActiveFrom ? new Date(dateTimeLastActiveFrom) : undefined;
          const toDate = dateTimeLastActiveTo ? new Date(dateTimeLastActiveTo) : undefined;
          if (fromDate && memberRegisteredDate < fromDate) return false;
          if (toDate && memberRegisteredDate > toDate) return false;
        }
        return true;
      });
  }, [
    members,
    nameList,
    verificationStatusList,
    emailList,
    mobileNumberList,
    domainList,
    dateRegistered.from,
    dateRegistered.to,
    StatusList,
    dateTimeLastActiveFrom,
    dateTimeLastActiveTo
  ]);

  useEffect(() => {
    setfilterMemberList([...filteredMembers]);
  }, [filteredMembers, setfilterMemberList]);

  const { verificationStatus } = useGetVerificationStatus();
  const { status } = useGetStatus();

  const names: string[] = [];
  const emails: string[] = [];
  const mobileNumbers: string[] = [];
  const domains: string[] = [];

  for (const member of members) {
    names.push(member.name);
    emails.push(member.emailAddress);
    mobileNumbers.push(member.mobileNumber);
    domains.push(member.domain);
  }

  const handleDateRange = (startDate: Date, endDate: Date) => {
    const from = new Date(startDate);
    const to = new Date(endDate);
    setDateTimeLastActiveFrom(from.toISOString());
    setDateTimeLastActiveTo(to.toISOString());
  };

  return (
    <div className="bg-table-head flex flex-row items-center gap-2 rounded-t-sm border-b p-2">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <p className="font-medium">Filters |</p>
        <FilterSelect
          label="Name"
          list={names}
          selectedValues={nameList}
          onChange={(values) => setNameList(values)}
        />

        <FilterStatus
          label="Verification Status"
          items={verificationStatus}
          value={verificationStatusList}
          onChange={(selected) => {
            setVerificationStatusList(selected);
          }}
        />

        <FilterSelect
          label="Email"
          list={emails}
          selectedValues={emailList}
          onChange={(values) => setEmailList(values)}
        />

        <FilterSelect
          label="Mobile Number"
          list={mobileNumbers}
          selectedValues={mobileNumberList}
          onChange={(values) => setMobileNumberList(values)}
        />

        <FilterSelect
          label="Domain"
          list={domains}
          selectedValues={domainList}
          onChange={(values) => setDomainList(values)}
        />

        <FilterDate
          value={{
            from: dateRegistered.from ? new Date(dateRegistered.from) : undefined,
            to: dateRegistered.to ? new Date(dateRegistered.to) : undefined
          }}
          onChange={(range: { from: Date; to: Date } | null) => {
            if (range) {
              setDateRegistered({
                from: range.from.toISOString(),
                to: range.to.toISOString()
              });
            } else {
              setDateRegistered({ from: "", to: "" });
            }
          }}
        />

        <FilterStatus
          label="Status"
          items={status}
          value={StatusList}
          onChange={(selected) => {
            setStatusList(selected);
          }}
        />

        <DateTimeRange onApply={handleDateRange} />
      </div>
    </div>
  );
}
