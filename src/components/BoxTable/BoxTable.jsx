import { useBoxContext } from '../../context/BoxContext';
import { formatCurrency } from '../../services/shippingService';
import { config } from '../../utils/config';
import styles from './BoxTable.module.css';

const BoxTable = () => {
  const { boxes } = useBoxContext();

  const rgbToCssColor = (rgbString) => {
    return `rgb(${rgbString})`;
  };

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Shipping Boxes List</h2>
      
      {boxes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No boxes added yet.</p>
          <p>Go to "Add Box" to create your first shipping box.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Receiver Name</th>
                <th>Weight (kg)</th>
                <th>Box Colour</th>
                <th>Destination Country</th>
                <th>Shipping Cost ({config.currency})</th>
              </tr>
            </thead>
            <tbody>
              {boxes.map((box) => (
                <tr key={box.id}>
                  <td>{box.receiverName}</td>
                  <td>{box.weight}</td>
                  <td>
                    <div className={styles.colorBoxWrapper}>
                      <div
                        className={styles.colorBox}
                        style={{ backgroundColor: rgbToCssColor(box.color) }}
                        title={`RGB: ${box.color}`}
                      ></div>
                      <span className={styles.colorText}>({box.color})</span>
                    </div>
                  </td>
                  <td>{box.country}</td>
                  <td className={styles.costCell}>
                    {formatCurrency(box.shippingCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {boxes.length > 0 && (
        <div className={styles.summary}>
          <p>Total Boxes: <strong>{boxes.length}</strong></p>
        </div>
      )}
    </div>
  );
};

export default BoxTable;

