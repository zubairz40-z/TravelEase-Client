const Overview = () => {
  return (
    <div className="space-y-6">

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h4>Total Bookings</h4>
          <p className="text-2xl font-bold">12</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4>Active Rentals</h4>
          <p className="text-2xl font-bold">3</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4>Total Spent</h4>
          <p className="text-2xl font-bold">$540</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold mb-2">Booking Activity</h4>
        <p className="text-sm text-slate-600">
          (Chart connected with backend data)
        </p>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold mb-2">Recent Bookings</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th>Vehicle</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Toyota Corolla</td>
              <td>Jan 4, 2026</td>
              <td>Confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Overview;
