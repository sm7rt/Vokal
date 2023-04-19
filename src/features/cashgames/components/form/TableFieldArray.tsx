import { Button, Col, Row, Tooltip } from 'antd';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FieldArray, formValueSelector } from 'redux-form';
import { IRootState } from '../../../../common/models/StateModel';
import RenderCount from '../../../../common/performance/RenderCount';
import TableForm from './TableForm';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type TableProps = {
  formName: string; // Name of Form
  onRemoveTable?: (id: string) => void;
  additionalComp?: (table: TableForm) => void;
};

//* ******************** */
// FORM PROPS */
//* ******************** */
export type TableForm = {
  tableId: string;
  maxPlayers: number;
  players: Array<string>;
};

type TablesArrayCompProps = {
  formName: string; // Name of Form
  onRemoveTable?: (table: TableForm) => void;
  additionalComp?: (table: TableForm, index: number) => React.ComponentType;
};

// Tables Array Comp
const TablesArrayComp = ({
  fields,
  formName,
  onRemoveTable,
  additionalComp
}: TablesArrayCompProps) => {
  const { t } = useTranslation();
  // Form Selector
  const formSelector = formValueSelector(formName);

  // Get Current Table
  const tables = useSelector((state: IRootState) =>
    formSelector(state, 'tables')
  );

  return (
    <Row className="p-1">
      <RenderCount componentName="renderTables" />
      {fields.map((table: string, index: number) => {
        const tableFromForm = tables[index];
        return (
          <Col
            key={index}
            className="bg-light p-2 mb-2"
            style={{ border: '1px dashed #ccc' }}
          >
            <RenderCount componentName="TableItem" />
            <Row type="flex" justify="space-between" align-items="center">
              <TableForm
                tableIdName={`${table}.tableId`}
                maxPlayersName={`${table}.maxPlayers`}
              />
              {fields.length > 1 && (
                <Tooltip title={t('REMOVE_TABLE')} placement="bottom">
                  <Button
                    icon="delete"
                    className="bg-danger text-white border-danger"
                    title="Remove Member"
                    onClick={() => {
                      onRemoveTable && onRemoveTable(tableFromForm);

                      // remove table
                      fields.remove(index);
                    }}
                  />
                </Tooltip>
              )}
            </Row>
            {additionalComp && additionalComp(tableFromForm, index)}
          </Col>
        );
      })}
      <Button
        type="primary"
        icon="plus"
        className="mt-2 mb-2"
        id="addTableButton"
        onClick={() =>
          fields.push({
            tableId: fields.length + 1,
            maxPlayers: 10,
            players: []
          })
        }
      >
        {t('ADD_NEW_TABLE').toUpperCase()}
      </Button>
    </Row>
  );
};

const Tables = React.memo(TablesArrayComp);

/**
 * Add Table Field Array
 */
const TableFieldArray = ({
  formName,
  onRemoveTable,
  additionalComp
}: TableProps) => {
  return (
    <Fragment>
      <FieldArray
        name="tables"
        component={Tables}
        formName={formName}
        onRemoveTable={onRemoveTable}
        additionalComp={additionalComp}
      />
    </Fragment>
  );
};

// Export Default
export default React.memo(TableFieldArray);
