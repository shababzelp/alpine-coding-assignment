export const PurchaseOrders = ({ purchaseOrders }: any) => {
  return (
    <table className="text-center">
      <thead>
        <tr>
          <th>Model Number</th>
          <th>Unit Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {purchaseOrders.map((po: any, idx: number) => (
          <tr key={idx}>
            <td>{po["model_number"]}</td>
            <td>{po["unit_price"]}</td>
            <td>{po["quantity"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
