import styles from "./page.module.css";
import { DashboardChart } from "@/components/DashboardChart";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { getUsageSummary } from "@/lib/utils";
import DashboardRecentFiles from "@/components/DashboardRecentFiles";
import DashboardSummaries from "@/components/DashboardSummaries";

const Dashboard = async () => {
  // Parallel requests
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className={styles.container}>
      <section>
        <DashboardChart used={totalSpace.used} />
        <DashboardSummaries usageSummary={usageSummary} />
      </section>

      <DashboardRecentFiles files={files.documents} />
    </div>
  );
};

export default Dashboard;
