import { lendingAppURLs } from 'js/Utils/urlMapper';

// const lendingDistributorLandingPages = [
//   ['ClearScore', lendingAppURLs.cs_start()],
//   ['TotallyMoney', lendingAppURLs.totally_money_start()],
//   ['TotallyMoney', lendingAppURLs.totally_money_web_start()],
//   ['Noddle', lendingAppURLs.noddle_start()],
//   ['Experian', lendingAppURLs.experian_generic_start()],
//   ['Confused.com', lendingAppURLs.confused_start()],
//   ['Monevo', lendingAppURLs.monevo_start()],
//   ['MoneySuperMarket', lendingAppURLs.msm_start()],
//   ['Accepty', lendingAppURLs.accepty_start()],
//   ['MoneySavingExpert', lendingAppURLs.mse_start()],
//   ['CompareTheMarket', lendingAppURLs.ctm_start()],
//   ['FreedomFinanceASDA', lendingAppURLs.freedom_finance_asda_start()],
//   ['FreedomFinance', lendingAppURLs.freedom_finance_start()],
//   ['MoneyGuru', lendingAppURLs.money_guru_start()],
// ];

export const lendingJourneyDefinition = {
  onboarding: {
    // landingPage: [
    //   {
    //     'title': 'Landing page 1',
    //     'description': 'start journey landing page',
    //     'link': lendingAppURLs.landing_page(),
    //     'hidden': false,
    //   }, {
    //     'title': 'Landing page 2',
    //     'description': 'start journey landing page',
    //     'link': lendingAppURLs.cust_landing(),
    //     'hidden': false,
    //   }, {
    //     'title': 'Borrowing details',
    //     'description': 'sliders page',
    //     'link': lendingAppURLs.borrowing_details(),
    //     'hidden': false,
    //   },
    // ] + lendingDistributorLandingPages.map(([name, link]) => ({
    //   title: `Landing page ${ name }`,
    //   description: `start journey ${ name }`,
    //   link,
    //   hidden: false,
    // })),
    details: [
      {
        'title': 'Your details',
        'link': lendingAppURLs.personal_details(),
        'hidden': false,
        'steps': [
          lendingAppURLs.personal_details(),
          lendingAppURLs.contact_details(),
          lendingAppURLs.credit_reference(),
        ],
      }, {
        'title': 'Your loan',
        'link': lendingAppURLs.product_offer(),
        'hidden': false,
        'steps': [
          lendingAppURLs.product_offer(),
          lendingAppURLs.id_verification(),
          lendingAppURLs.account(),
          lendingAppURLs.verify_email(),
        ],
      }, {
        'title': 'Payment & documents',
        'link': lendingAppURLs.loan_and_payment(),
        'hidden': false,
        'steps': [
          lendingAppURLs.loan_and_payment(),
          lendingAppURLs.direct_debit_mandate(),
          lendingAppURLs.user_input_overview(),
          lendingAppURLs.direct_debit_confirmation(),
          lendingAppURLs.documents_and_agreement(),
          lendingAppURLs.user_security_questions(),
          lendingAppURLs.create_security_questions(),
        ],
      },
    ],
    verifications: [
      {
        'title': 'Loan',
        'link': lendingAppURLs.product_offer(),
        'hidden': false,
      }, {
        'title': 'Identity',
        'link': lendingAppURLs.id_verification(),
        'hidden': false,
      }, {
        'title': 'Verify email',
        'link': lendingAppURLs.verify_email(),
        'hidden': true,
      }, {
        'title': 'Prtial match verification',
        'link': lendingAppURLs.user_security_questions(),
        'hidden': true,
      }, {
        'title': 'Repayment',
        'link': lendingAppURLs.loan_and_payment(),
        'hidden': false,
      }, {
        'title': 'Direct Debit Mandate',
        'link': lendingAppURLs.direct_debit_mandate(),
        'hidden': true,
      }, {
        'title': 'Direct debit confirmation',
        'link': lendingAppURLs.direct_debit_confirmation(),
        'hidden': true,
      }, {
        'title': 'Docs',
        'link': lendingAppURLs.documents_and_agreement(),
        'hidden': false,
      },
    ],
  },
};
