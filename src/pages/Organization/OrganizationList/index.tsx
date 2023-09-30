import React from 'react';
import {
  FiCalendar, FiMapPin, FiShare2, FiUsers, FiPhone,
} from 'react-icons/fi';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Layout from '@/components/base/Layout';
import { useOrganizations } from '@/hooks/organization';
import { useCurrentUser } from '@/hooks/auth';
import noCompanyLogo from '@/assets/images/illustrator/company-no-logo.png';

const sortEnums = [
  'name-asc',
  'name-desc',
  'created_at-desc',
  'created_at-asc',
  'employees_count-asc',
  'employees_count-desc',
] as const;

type SortOption = typeof sortEnums[number];

const sortOptions: Array<{ label: string, value: SortOption }> = [
  {
    label: 'Tên theo thứ tự A-Z',
    value: 'name-asc',
  },
  {
    label: 'Tên theo thứ tự Z-A',
    value: 'name-desc',
  },
  {
    label: 'Tham gia gần đây nhất',
    value: 'created_at-desc',
  },
  {
    label: 'Tham gia lâu nhất',
    value: 'created_at-asc',
  },
  {
    label: 'Quy mô tăng dần',
    value: 'employees_count-asc',
  },
  {
    label: 'Quy mô giảm dần',
    value: 'employees_count-desc',
  },
];

export default function OrganizationList() {
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState<SortOption>('name-asc');
  const { data: organizations = [] } = useOrganizations();
  const currentUser = useCurrentUser();

  const filteredOrganizations = React.useMemo(() => {
    if (!search) return organizations;
    return organizations.filter((
      organization,
    ) => organization.name.toLowerCase()
      .includes(search.toLowerCase()));
  }, [organizations, search]);

  const sortedOrganizations = React.useMemo(() => {
    if (sort === 'name-asc') {
      return filteredOrganizations.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === 'name-desc') {
      return filteredOrganizations.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sort === 'created_at-desc') {
      return filteredOrganizations.sort((a, b) => moment(b.createdAt)
        .diff(moment(a.createdAt)));
    }
    if (sort === 'created_at-asc') {
      return filteredOrganizations.sort((a, b) => moment(a.createdAt)
        .diff(moment(b.createdAt)));
    }
    if (sort === 'employees_count-asc') {
      return filteredOrganizations.sort(
        (a, b) => (a.employeesCount || 0) - (b.employeesCount || 0),
      );
    }
    if (sort === 'employees_count-desc') {
      return filteredOrganizations.sort(
        (a, b) => (b.employeesCount || 0) - (a.employeesCount || 0),
      );
    }
    return filteredOrganizations;
  }, [filteredOrganizations, sort]);

  return (
    <Layout>
      <div className="pt-32 mx-8 mt-1 dark:text-white">
        <div className="flex flex-col justify-end gap-3 mb-4 lg:flex-row">
          <input
            className="w-full h-[38px] px-5 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:border-gray-700 dark:text-white lg:w-96"
            placeholder="Tìm kiếm công ty"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            className="w-full lg:w-64"
            options={sortOptions}
            placeholder="Sắp xếp"
            classNamePrefix="react-select"
            value={sortOptions.find((option) => option.value === sort)}
            onChange={(option) => setSort(option?.value || 'name-asc')}
            isClearable
          />
        </div>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-4">
          {
            sortedOrganizations.map((organization) => (
              <div key={organization.code} className="p-4 text-sm bg-white rounded shadow dark:bg-dark">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <Link to={currentUser?.organization === organization.code ? '/me/organization' : `/organizations/${organization.code}`}>
                    <img
                      src={organization.profilePicture || noCompanyLogo}
                      alt="Organization"
                      className="w-16 h-16 mb-2 rounded-full"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link
                      to={currentUser?.organization === organization.code ? '/me/organization' : `/organizations/${organization.code}`}
                      className="text-base font-bold"
                    >
                      {organization.name}
                    </Link>
                    <div className="flex items-center mb-1 italic text-gray-400">
                      {moment(organization?.createdAt)
                        .fromNow()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {
                      !!organization.socialMedia?.facebook && (
                        <a
                          href={organization.socialMedia.facebook}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaFacebookSquare className="w-4 h-4" />
                        </a>
                      )
                    }
                    {
                      !!organization.socialMedia?.twitter && (
                        <a
                          href={organization.socialMedia.twitter}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaTwitterSquare className="w-4 h-4" />
                        </a>
                      )
                    }
                    {
                      !!organization.socialMedia?.instagram && (
                        <a
                          href={organization.socialMedia.instagram}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaInstagramSquare className="w-4 h-4" />
                        </a>
                      )
                    }
                    {
                      !!organization.socialMedia?.zalo && (
                        <a
                          href={organization.socialMedia.zalo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SiZalo className="w-4 h-4" />
                        </a>
                      )
                    }
                  </div>
                </div>
                {
                  !!organization.foundedYear && (
                    <div className="flex items-center mb-1">
                      <FiCalendar className="inline-block mr-2" />
                      Thành lập năm
                      {' '}
                      {organization.foundedYear}
                    </div>
                  )
                }
                <div className="flex items-center mb-1">
                  <FiUsers className="inline-block mr-2" />
                  {organization.employeesCount}
                  {' nhân viên'}
                </div>
                {
                  !!organization.address && (
                    <div className="flex items-center mb-1">
                      <FiMapPin className="inline-block mr-2" />
                      {organization.address}
                    </div>
                  )
                }
                <div className="flex items-center mb-1">
                  <FiPhone className="inline-block mr-2" />
                  {organization?.phoneNumber}
                </div>
                {
                  !!organization.website && (
                    <div className="flex items-center mb-1">
                      <FiShare2 className="inline-block mr-2" />
                      <a
                        href={organization.website}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-primary"
                      >
                        {organization.website}
                      </a>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  );
}
