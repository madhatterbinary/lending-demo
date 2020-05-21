/* eslint-disable import/no-unused-modules */
import faker from 'faker';
import { generateDOB, getRandomBetween } from './stubs';

faker.locale = 'en_GB';

const firstName = faker.fake('{{name.firstName}}');
const lastName = faker.fake('{{name.lastName}}');
const addressLine1 = faker.fake('{{address.secondaryAddress}}');
const addressLine2 = faker.fake('{{address.streetAddress}}');
const phoneNumber = '07767385188';

export const lendingJourneyStub = {
  loan_amount: getRandomBetween(1000, 10000),
  term_in_months: getRandomBetween(12, 60),
  title: 'Mr',
  first_name: firstName,
  loan_product_id: 2,
  last_name: lastName,
  date_of_birth: generateDOB(),
  email_address: `${ firstName }.${ lastName }@yobota.uk`,
  phone_number: phoneNumber,
  addresses: [
    {
      address_type: 'Current',
      building: '101',
      line_1: addressLine1,
      line_2: addressLine2,
      post_town: 'Yobota town',
      postcode: 'YO30TA',
      move_in_date: '2014-01-01',
      move_out_date: '',
      residential_status: 'Mortgage',
      ptcabs: '28030098305',
      unique_address_id: '28030098305',
    },
  ],
  employment_status: 'FULLTIME',
  total_monthly_expenditure: '500',
  user_provided_income_amount: '100000',
  user_provided_income_period: 'Monthly',
  user_provided_tax_position: 'before_tax',
  question_0: 1,
  question_1: 2,
  question_2: 3,
  question_3: 4,
  question_4: 5,
  name_on_account: 'SUCCESS',
  account_number: '12345678',
  sort_code: '000001',
  confirm_account_holder: true,
  repayment_date: '15',
  consent_for_hard_credit_search: true,
  security_questions: [
    {
      security_topic_name: 'security_street',
    },
    {
      security_topic_name: 'security_company',
    },
    {
      security_topic_name: 'security_school',
    },
  ],
  person_title: 'Mr',
  message: '',
};

export const savingsJourneyStub = {
  title: 'Mr',
  first_name: firstName,
  last_name: 'SUCCESS',
  date_of_birth: generateDOB(),
  email_address: `${ firstName }@yobota.uk`,
  phone_number: '07767385180',
  addresses: [
    {
      address_type: 'Current',
      building: '101',
      line_1: 'YOBOTA STREET 1',
      line_2: 'YOBOTA STREET 2',
      post_town: 'YOBOTA TOWN',
      postcode: 'YO3 0TA',
      move_in_date: '2014-01-01',
      move_out_date: '',
      residential_status: 'Mortgage',
      ptcabs: 11111111111,
    },
  ],
  nationality_check: 'UK',
  tax_residency_check: 'UKOnly',
  ni_number: 'AA112233B',
  name_on_account: 'SUCCESS',
  account_number: '12345678',
  sort_code: '000001',
  confirm_account_holder: true,
  security_questions: [
    {
      security_topic_name: 'security_street',
    },
    {
      security_topic_name: 'security_company',
    },
    {
      security_topic_name: 'security_school',
    },
  ],
};
