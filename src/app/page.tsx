//Components
import { MemberTable } from "@/components/member-table";

export default function Home() {
  return (
    <main className="container mx-auto p-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl">Members</h1>
        <p className="text-muted-foreground text-sm">View your members here.</p>
      </div>
      <MemberTable />
    </main>
  );
}
