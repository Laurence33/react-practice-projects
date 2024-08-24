
import { useMemo } from 'react';
import { useTable, useColumnOrder } from 'react-table';
import { MOCK_DATA } from '../MOCK_DATA';
import { GROUP_COLUMNS } from './columns';

export const ColumnOrderTable = () => {
  const columns = useMemo(() => GROUP_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, footerGroups, setColumnOrder } = useTable({
    columns,
    data,
  }, useColumnOrder);

  function changeOrder() {
    setColumnOrder([
      'id', 'first_name', 'last_name', 'phone', 'country', 'date_of_birth'
    ])
  }

  return (
    <>
      <button onClick={changeOrder}>Change Column Order</button>
      <table {...getTableProps}>
        <thead>
          {headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {// Render the header
                      column.render('Header')}
                  </th>
                ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {// Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {// Render the cell contents
                            cell.render('Cell')}
                        </td>
                      )
                    })}
                </tr>
              )
            })}
        </tbody>
        <tfoot>
          {
            footerGroups.map(footerGroup => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {
                  footerGroup.headers.map(column => (
                    <th {...column.getFooterProps()}>
                      {
                        column.render('Footer')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </tfoot>
      </table>
    </>

  )
}
