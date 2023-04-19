import {
  Row,
  Table,
  Popconfirm,
  Button,
  Icon,
  Tooltip,
  Tag,
  Select
} from 'antd';
import React, { useState, Fragment } from 'react';
import { UserAccount } from '../../models/UsersModel.d';
import { useTranslation } from 'react-i18next';

//* ******************** */
// DATATABLE CONFIG      */
//* ******************** */

const Roles = [
  { label: 'Super admin', value: 'ADMIN' },
  { label: 'Limited admin', value: 'LIMITED_ADMIN' },
  { label: 'Poker manager', value: 'POKER_ROOM_MANAGER' },
  { label: 'Community manager', value: 'COMMUNITY_MANAGER' }
];

type EditRoleProps = {
  user: UserAccount;
  onEditUserAccount: (id: string, data: string) => void;
  setEditableCell: (id: string) => void;
};

const EditRoleForm = ({
  user,
  onEditUserAccount,
  setEditableCell
}: EditRoleProps) => {
  const [role, setRole] = useState(user.data.role);
  return (
    <Fragment>
      <Select
        style={{ width: '150px' }}
        defaultValue={role}
        onChange={(value: string) => setRole(value)}
      >
        {Roles.map((role: any, index: number) => (
          <Select.Option key={index} value={role.value}>
            {role.label}
          </Select.Option>
        ))}
      </Select>
      <Row type="flex" justify="space-between" align="middle">
        <Icon
          type="check"
          style={{ fontSize: '18px', cursor: 'pointer' }}
          onClick={() => {
            onEditUserAccount(user.id, role);
            setEditableCell('');
          }}
        />
        <Icon
          className="ml-2 text-danger"
          type="close"
          style={{ fontSize: '18px', cursor: 'pointer' }}
          onClick={() => setEditableCell('')}
        />
      </Row>
    </Fragment>
  );
};

// header For DataTable
const columns = ({
  t,
  onDelete,
  onResendMail,
  onEditUserAccount,
  editableCell,
  setEditableCell,
  owner
}: any) => [
  {
    key: 'status',
    title: t('USERS_STATUS_LABEL'),
    render: (user: UserAccount) => (
      <Tag color={user.data && user.data.active ? 'green' : 'orange'}>
        {user.data && user.data.active ? 'VERIFIED' : 'PENDING'}
      </Tag>
    )
  },
  {
    key: 'email',
    title: t('USERS_EMAIL_ADDRESS_LABEL'),
    render: (user: UserAccount) => user.data && user.data.email
  },
  {
    key: 'firstName',
    title: t('USERS_FIRSTNAME_LABEL'),
    render: (user: UserAccount) => user.data && user.data.firstName
  },
  {
    key: 'lastName',
    title: t('USERS_LASTNAME_LABEL'),
    render: (user: UserAccount) => user.data && user.data.lastName
  },
  {
    key: 'role',
    title: t('USERS_ROLE_LABEL'),
    render: (user: UserAccount) => {
      const role =
        user.data && Roles.find((r: any) => r.value === user.data.role);
      if (user.data && user.data.role) {
        return (
          <Row type="flex" justify="space-between" align="middle">
            {editableCell !== user.id ? (
              <Fragment>
                <span>{role ? role.label : ''}</span>
                {owner &&
                  owner.data &&
                  owner.data.role === 'ADMIN' &&
                  user.id !== owner.id && (
                    <Tooltip title={t('CHANGE_ROLE')}>
                      <Icon
                        type="edit"
                        style={{ fontSize: '18px', cursor: 'pointer' }}
                        onClick={() => setEditableCell(user.id)}
                      />
                    </Tooltip>
                  )}
              </Fragment>
            ) : (
              <EditRoleForm
                user={user}
                onEditUserAccount={onEditUserAccount}
                setEditableCell={setEditableCell}
              />
            )}
          </Row>
        );
      }
      return null;
    }
  },
  {
    key: 'actions',
    title: '',
    className: 'text-right',
    render: (user: UserAccount) => {
      return (
        <Fragment>
          {owner &&
          owner.data &&
          owner.data.role === 'ADMIN' &&
          user.id !== owner.id ? (
            <Row>
              {/* Resend Invitation Only if the RequestState is Pending */}
              {user.data && !user.data.active && (
                <Popconfirm
                  title={t('USERS_RESEND_INVITATION_CONFIRM', {
                    emailAddress: user.data.email
                  })}
                  onConfirm={() => onResendMail(user.data.email)}
                >
                  <Tooltip title={t('USERS_RESEND_INVITATION')}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon="mail"
                      className="mr-2 cursor-pointer"
                    />
                  </Tooltip>
                </Popconfirm>
              )}
              <Popconfirm
                title={t('USERS_SURE_DELETE', {
                  emailAddress: user.data && user.data.email
                })}
                onConfirm={() => onDelete(user.id)}
              >
                <Tooltip title={t('USERS_DELETE_ACCOUNT')}>
                  <Button
                    type="danger"
                    shape="circle"
                    icon="delete"
                    className="cursor-pointer"
                  />
                </Tooltip>
              </Popconfirm>
            </Row>
          ) : null}
        </Fragment>
      );
    }
  }
];

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  datas: Array<any>;
  onDelete: (id: string) => void;
  onResendMail: (mail: string) => void;
  onEditUserAccount: (id: string, data: string) => void;
  owner: AccountApiDefinitions.CustomerAccount;
};

// Users DataTable
const UsersDataTable = ({
  datas,
  onDelete,
  onResendMail,
  onEditUserAccount,
  owner
}: Props) => {
  const [editableCell, setEditableCell] = useState();
  const { t } = useTranslation();
  return (
    <Table
      className="w-100"
      pagination={false}
      columns={columns({
        onDelete,
        t,
        onResendMail,
        editableCell,
        setEditableCell,
        onEditUserAccount,
        owner
      })}
      dataSource={datas}
      rowKey="id"
    />
  );
};

// Export Default
export default UsersDataTable;
