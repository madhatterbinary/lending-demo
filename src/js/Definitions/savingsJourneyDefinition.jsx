import { savingsAppURLs } from 'js/Utils/urlMapper';

export const savingsJourneyDefinition = {
  onboarding: {
    // landingPage: [
    //   {
    //     'title': 'Landing page 1',
    //     'description': 'start journey landing page',
    //     'link': savingsAppURLs.landing_page(),
    //     'hidden': false,
    //   }, {
    //     'title': 'Savings details',
    //     'description': 'sliders page',
    //     'link': savingsAppURLs.saving_details(),
    //     'hidden': false,
    //   }, {
    //     'title': 'Summary page',
    //     'description': 'about product static page',
    //     'link': savingsAppURLs.saving_summary(),
    //     'hidden': false,
    //   }, {
    //     'title': 'Terms and conditions',
    //     'description': 'Hardcoded pdfs',
    //     'link': savingsAppURLs.terms_conditions(),
    //     'hidden': false,
    //   },
    // ],
    details: [
      {
        'title': 'About you',
        'link': savingsAppURLs.savings_customer_person_details(),
        'hidden': false,
        'steps': [
          savingsAppURLs.savings_customer_person_details(),
          savingsAppURLs.savings_customer_address_details(),
          savingsAppURLs.savings_customer_residency_comm_details(),
        ],
      }, {
        'title': 'Create account',
        'link': savingsAppURLs.savings_signup(),
        'hidden': false,
        'steps': [
          savingsAppURLs.savings_signup(),
          savingsAppURLs.verify_email(),
          savingsAppURLs.savings_security_questions_journey(),
          savingsAppURLs.user_security_check(),
        ],
      }, {
        'title': 'Bank details',
        'link': savingsAppURLs.savings_details(),
        'hidden': false,
        'steps': [
          savingsAppURLs.savings_details(),
        ],
      },
    ],
    // verifications: [
    //   {
    //     'title': 'About you',
    //     'link': savingsAppURLs.verify_email(),
    //     'hidden': false,
    //     'steps': [
    //       savingsAppURLs.verify_email(),
    //     ],
    //   }, {
    //     'title': 'Create security questions',
    //     'link': savingsAppURLs.savings_security_questions_journey(),
    //     'hidden': true,
    //     'steps': [
    //       savingsAppURLs.savings_security_questions_journey(),
    //     ],
    //   }, {
    //     'title': 'Bank account details',
    //     'link': savingsAppURLs.savings_details(),
    //     'hidden': false,
    //     'steps': [
    //       savingsAppURLs.savings_details(),
    //     ],
    //   }, {
    //     'title': 'Congratulations page',
    //     'description': 'we dont use this',
    //     'link': savingsAppURLs.savings_journey_completed(),
    //     'hidden': false,
    //     'steps': [
    //       savingsAppURLs.savings_journey_completed(),
    //     ],
    //   },
    // ],
  },
  servicing: {
    endofterm: [
      {
        'title': 'Deposit type',
        'link': savingsAppURLs.end_of_term_choices(),
        'hidden': false,
        'steps': [
          savingsAppURLs.end_of_term_choices(),
          savingsAppURLs.end_of_term_election_summary(),
        ],
      },
      {
        'title': 'About you',
        'link': savingsAppURLs.end_of_term_election_person_details(),
        'hidden': false,
        'steps': [
          savingsAppURLs.end_of_term_election_person_details(),
        ],
      },
      {
        'title': 'Deposit summary',
        'link': savingsAppURLs.end_of_term_election_reinvest_amount(),
        'hidden': false,
        'steps': [
          savingsAppURLs.end_of_term_election_reinvest_amount(),
          savingsAppURLs.end_of_term_election_documents(),
          savingsAppURLs.end_of_term_election_success(),
        ],
      },
    ],

  },
};
