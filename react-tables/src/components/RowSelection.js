
import { useMemo } from 'react';
import { useTable, useRowSelect } from 'react-table';
import { MOCK_DATA } from '../MOCK_DATA';
import { GROUP_COLUMNS } from './columns';
import { CheckBox } from './CheckBox';

export const RowSelectionTable = () => {
  const columns = useMemo(() => GROUP_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, footerGroups, selectedFlatRows } = useTable({
    columns,
    data,
  }, useRowSelect,

    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <CheckBox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  const firstTenRows = rows.slice(0, 10);


  return (
    <>
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
            firstTenRows.map(row => {
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
      <pre>
        {
          JSON.stringify({
            selectedFlatRows: selectedFlatRows.map(row => row.original)
          },
            null,
            2
          )
        }
      </pre>
    </>
  )
}
