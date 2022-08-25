import currencyFormatter from "../helpers/currencyFormatter";

const BidList = ({ bids }) => {
  return (
    <div className="row mt-4">
      <div className="col-12">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Bidder</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((b) => (
              <tr key={b.id}>
                <td>{b.bidder}</td>
                <td>{currencyFormatter.format(b.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BidList;
