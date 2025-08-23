import FullPageSpinner from "@/components/FullPageSpinner";
import SalesLineChart from "@/components/SalesLineChart";
import { useGetSalesLast30DaysQuery, useGetSalesLast7DaysQuery } from "@/lib/api";

const SalesPage = () => {

    const {data: salesDataLast7Days, isLoading: isLoadingLast7DaysSales, isError: isErrorLast7DaysSales, error: errorLast7DaysSales } = useGetSalesLast7DaysQuery();
    const {data: salesDataLast30Days, isLoading: isLoadingLast30DaysSales, isError: isErrorLast30DaysSales, error: errorLast30DaysSales } = useGetSalesLast30DaysQuery();

    console.log('salesDataLast7Days:', salesDataLast7Days);
    console.log('salesDataLast30Days:', salesDataLast30Days);

    if (isLoadingLast7DaysSales || isLoadingLast30DaysSales) {
        return <FullPageSpinner />
    }

    return (
        <div className="grid grid-cols-1 gap-6 p-6">
        {salesDataLast7Days && (
            <SalesLineChart title="Sales - Last 7 Days" data={salesDataLast7Days} />
        )}
        {salesDataLast30Days && (
            <SalesLineChart title="Sales - Last 30 Days" data={salesDataLast30Days} />
        )}
        </div>
    );

}

export default SalesPage;