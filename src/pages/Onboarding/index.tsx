import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import * as yup from 'yup';
import Stepper, { Step } from '@/pages/Onboarding/components/Stepper';
import Layout from '@/components/base/Layout';
import OnboardingCompany from '@/pages/Onboarding/tabs/OnboardingCompany';
import OnboardingAddUsers from '@/pages/Onboarding/tabs/OnboardingAddUsers';
import { CreateOrganizationFormData } from '@/models/Organization/Organization';

const steps: Step[] = [
  { title: 'Thông tin công ty' },
  { title: 'Thêm thành viên' },
];

const schema: ObjectSchema<CreateOrganizationFormData> = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên công ty'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  phoneNumber: yup.string().required('Vui lòng nhập số điện thoại'),
  profilePictureFile: yup.mixed(),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  employeesCount: yup.number().required('Vui lòng nhập số lượng nhân viên'),
  foundedYear: yup.number().required('Vui lòng nhập năm thành lập'),
  website: yup.string().url('Website không hợp lệ'),
  socialMedia: yup.object().shape({
    facebook: yup.string().url('Facebook không hợp lệ'),
    twitter: yup.string().url('Twitter không hợp lệ'),
    zalo: yup.string().url('Zalo không hợp lệ'),
    instagram: yup.string().url('Instagram không hợp lệ'),
  }),
});

const defaultValues: CreateOrganizationFormData = {
  name: '',
  email: '',
  phoneNumber: '',
  profilePictureFile: undefined,
  address: '',
  employeesCount: 10,
  foundedYear: 2021,
  website: '',
  socialMedia: {
    facebook: '',
    twitter: '',
    zalo: '',
    instagram: '',
  },
};

export default function Onboarding() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const form = useForm<CreateOrganizationFormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <Layout>
      <div className="fixed z-50 inset-0 bg-gray-50">
        <div className="max-w-4xl mx-auto mt-16">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div>
          {
            currentStep === 0 ? (
              <OnboardingCompany
                onNext={() => setCurrentStep(1)}
                form={form}
              />
            ) : (
              <OnboardingAddUsers onNext={() => {}} onBack={() => setCurrentStep(0)} />
            )
          }
        </div>
      </div>
    </Layout>
  );
}
