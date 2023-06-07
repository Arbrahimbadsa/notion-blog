import { useEffect, useState } from "react";
import axios from "axios";

const TableBlock = ({ block }) => {
  const blockId = block.id;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(`/api/blocks?pageId=${blockId}`);
        const blocks = response.data;

        const rowBlocks = blocks.map((b) => b.table_row.cells);

        setTableData(rowBlocks);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, [blockId]);

  return (
    <table className="mx-auto table-auto border-collapse border border-gray-300">
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td className="border border-gray-300 px-4 py-2" key={cellIndex}>
                {cell.map((content, index) => (
                  <span key={index}>
                    {content.plain_text}
                  </span>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBlock;
