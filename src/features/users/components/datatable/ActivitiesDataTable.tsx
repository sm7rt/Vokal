import { Table, Tag, Pagination } from 'antd';
import React from 'react';

//* ******************** */
// DATATABLE CONFIG      */
//* ******************** */

// header For DataTable
const columns = [
  {
    title: '',
    dataIndex: 'date',
    render: (text: string) => <Tag color="#1890FF">{text}</Tag>
  },
  {
    title: '',
    dataIndex: 'type'
  },
  {
    title: '',
    dataIndex: 'description'
  }
];

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  data: Array<any>;
  totalElements: number;
  fetchActivities: (page: number, pageSize: number) => void;
  defaultPageSize: number;
};

// Activities DataTable
const ActivitiesDataList = (props: Props) => {
  const { totalElements, data, fetchActivities, defaultPageSize } = props;
  return (
    <div className="h-100">
      <Table
        className="d-block"
        pagination={false}
        columns={columns}
        dataSource={data}
        rowKey="id"
        showHeader={false}
        onChange={pagination => {
          fetchActivities(pagination.current, pagination.pageSize);
        }}
      />
      <div className="position-absolute fixed-bottom p-3 w-100 ">
        <div className="d-flex flex-row-reverse">
          <Pagination
            defaultPageSize={defaultPageSize}
            total={totalElements}
            showSizeChanger={true}
            pageSizeOptions={['10', '20', '30', '40', '50']}
          />
        </div>
      </div>
    </div>
  );
};

// Export Default
export default ActivitiesDataList;
