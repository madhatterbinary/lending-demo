/* eslint-disable */
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

export const lendingAppURLs = {
  // Landing pages
  'landing_page':                       () => '/lending/',
  'cust_landing':                       () => '/lending/',
  // distributor landing pages
  'cs_start':                           () => '/lending/onboarding/clearscore',
  'noddle_start':                       () => '/lending/onboarding/noddle',
  'totally_money_start':                () => '/lending/onboarding/totallymoney',
  'totally_money_web_start':            () => '/lending/onboarding/totallymoneyweb',
  'experian_generic_start':             () => '/lending/onboarding/experian',
  'confused_start':                     () => '/lending/onboarding/confused',
  'accepty_start':                      () => '/lending/onboarding/accepty',
  'msm_start':                          () => '/lending/onboarding/moneysupermarket',
  'mse_start':                          () => '/lending/onboarding/moneysavingexpert',
  'monevo_start':                       () => '/lending/onboarding/monevo',
  'ctm_start':                          () => '/lending/onboarding/comparethemarket',
  'freedom_finance_asda_start':         () => '/lending/onboarding/freedomfinanceasda',
  'freedom_finance_start':              () => '/lending/onboarding/freedomfinance',
  'money_guru_start':                   () => '/lending/onboarding/moneyguru',
  'loans_warehouse_start':              () => '/lending/onboarding/loanswarehouse',

  'borrowing_details':                  () => '/lending/getaloan',

  'personal_details':                   () => '/lending/onboarding/details',
  'contact_details':                    () => '/lending/onboarding/address',
  'credit_reference':                   () => '/lending/onboarding/expenses',

  'product_offer':                      () => '/lending/onboarding/chooseloan',
  'id_verification':                    () => '/lending/onboarding/verifyidentity',

  'account':                            () => '/lending/signup',
  'verify_email':                       () => '/lending/onboarding/verifyemail',

  // TODO: Fix this with actual page with questions
  'user_security_questions':            () => '/lending/onboarding/partialmatchverification',

  'loan_and_payment':                   () => '/lending/onboarding/paymentdetails',
  'direct_debit_mandate':               () => '/lending/onboarding/directdebitmandate',
  'direct_debit_confirmation':          () => '/lending/onboarding/directdebitconfirmation',

  'user_input_overview':                () => '/lending/onboarding/userinputoverview',
  'documents_and_agreement':            () => '/lending/onboarding/signyourdocuments',

  'create_security_questions':          () => '/lending/servicing/securityquestions',
  'customer_communication_preferences': () => '/lending/servicing/communicationpreferences',
  'customer_overview':                  () => '/lending/servicing/',
  'customer_account':                   () => '/lending/account',

  // Payment journeys
  'overpayment_start':                  () => '/lending/servicing/manageloan/payment/overpaymentstart',
  'payment_start':                      () => '/lending/servicing/manageloan/payment/carddetails',
  'payment_redirect':                   () => '/lending/servicing/manageloan/payment/redirect',
  'payment_processing':                 () => '/payment/processing',
  'payment_finalising':                 () => '/lending/servicing/manageloan/payment/finalising',
  'payment_completed':                  () => '/lending/servicing/manageloan/payment/completed',
  // Withdrawal Agreement & closing loan
  'right_to_withdrawal_agreement':      () => '/lending/servicing/manageloan/withdrawal/agreement',
  'right_to_withdrawal_payment':        () => '/lending/servicing/manageloan/withdrawal/carddetails',
  'right_to_withdrawal_redirect':       () => '/lending/servicing/manageloan/withdrawal/redirect',
  'right_to_withdrawal_processing':     () => '/lending/servicing/manageloan/withdrawal/processing',
  'right_to_withdrawal_finalising':     () => '/lending/servicing/manageloan/withdrawal/finalising',
  'right_to_withdrawal_completed':      () => '/lending/servicing/manageloan/withdrawal/completed',
  // Early Settlement & closing loan
  'early_settlement_start':             () => '/lending/servicing/manageloan/earlysettlement/carddetails',
  'early_settlement_redirect':          () => '/lending/servicing/manageloan/earlysettlement/redirect',
  'early_settlement_finalising':        () => '/lending/servicing/manageloan/earlysettlement/finalising',
  'early_settlement_completed':         () => '/lending/servicing/manageloan/earlysettlement/completed',
  
  'default':                            () => (''),
};

export const lendingApiURLs = {
  // Loan and person details
  'cust_landing':                       () => '/',
  'borrowing_details':                  () => '/lending/i_want_a_loan/',
  'personal_details':                   () => '/lending/details/',
  'contact_details':                    () => '/lending/address/',
  'credit_reference':                   () => '/lending/money/',
  // Choose product
  'product_offer':                      () => '/lending/yourdecision/',
  // Verify identity from Equifax
  'id_verification':                    () => '/lending/identity/',
  // Registartion/Auth0
  'verify_email':                       () => '',
  // Payment details
  'loan_and_payment':                   () => '/lending/payment/',
  'direct_debit_mandate':               () => '/lending/directdebit/',
  'direct_debit_confirmation':          () => '/lending/directdebitconfirmed/',

  // User input overview
  'user_input_overview':                () => '/lending/user_input_overview/',
  // Documents
  'documents_and_agreement':            () => '/lending/documents/',

  // payment journeys
  'payment_start':                      () => '/lending/account/management/payment/start/',
  'payment_redirect':                   () => '/lending/account/management/payment/redirect/',
  'payment_processing':                 () => '/lending/account/management/payment/processing/',
  'payment_finalising':                 () => '/lending/account/management/payment/finalising/',
  'payment_completed':                  () => '/lending/account/management/payment/completed/',
  // Payment End loan
  // Update bank account
  'bank_account_update_start':          () => '/lending/account/bank_account_update/start',
  'bank_account_update_end':            () => '/lending/account/bank_account_update/end',
  // Update address
  'address_update_start':               () => '/lending/account/address_update/start',
  'address_update_end':                 () => '/lending/account/address_update/end',
  'customer_account':                   () => '/lending/account',
  // Withdrawal Agreement & closing loan
  'right_to_withdrawal_agreement':      () => '/lending/account/management/withdrawal/agreement/',
  'right_to_withdrawal_payment':        () => '/lending/account/management/withdrawal/payment/',
  'right_to_withdrawal_redirect':       () => '/lending/account/management/withdrawal/redirect/',
  'right_to_withdrawal_processing':     () => '/lending/account/management/payment/processing/',
  'right_to_withdrawal_finalising':     () => '/lending/account/management/withdrawal/finalising/',
  'right_to_withdrawal_completed':      () => '/lending/account/management/withdrawal/completed/',
  // 'update_account_details':             () => '/lending/account/preferences_updated',
  // 'early_settlement_start': () => 'lending/account/management/early_settlement/start/',
  // If not in the list return to homepage

  // Early Settlement & closing loan  /earlysettlement/confirm
  'early_settlement_start':      () => '/lending/account/management/early_settlement/start/',
  'early_settlement_redirect':      () => '/lending/account/management/early_settlement/redirect/',
  'early_settlement_finalising':      () => '/lending/account/management/early_settlement/finalising/',
  'early_settlement_completed':      () => '/lending/account/management/early_settlement/completed/',

  // Distribution Urls
  'cs_start':                           () => '/lending/cs_your_decision/',
  'noddle_start':                       () => '/lending/noddle_your_decision/',
  'totally_money_start':                () => '/lending/totally_money_your_decision/',
  'totally_money_web_start':            () => '/lending/totally_money_web_your_decision/',
  'experian_generic_start':             () => '/lending/experian_your_decision/',
  'confused_start':                     () => '/lending/confused_your_decision/',
  'accepty_start':                      () => '/lending/accepty_your_decision/',
  'msm_start':                          () => '/lending/msm_your_decision/',
  'mse_start':                          () => '/lending/mse_your_decision/',
  'monevo_start':                       () => '/lending/monevo_your_decision/',
  'ctm_start':                          () => '/lending/ctm_your_decision/',
  'freedom_finance_asda_start':         () => '/lending/freedom_finance_asda_your_decision/',
  'freedom_finance_start':              () => '/lending/freedom_finance_your_decision/',
  'money_guru_start':                   () => '/lending/money_guru_your_decision/',
  'loans_warehouse_start':              () => '/lending/loans_warehouse_your_decision',

  'default':                            () => (''),
};

export const savingsAppURLs = {
  // Loan and person details
  'landing_page':                             () => '/savings/',
  'savings_landing':                          () => '/',

  // Trash pages (static no equivalent on BE)
  'saving_details':                           () => '/savings/getsaving',
  'saving_summary':                           () => '/savings/summarysavings',
  'terms_conditions':                         () => '/savings/termsandconditions',

  'smartsave_customer_details':               () => '/savings/onboarding/smartsave',
  'savings_customer_person_details':          () => '/savings/onboarding/details',
  'savings_customer_address_details':         () => '/savings/onboarding/address',
  'savings_customer_residency_comm_details':  () => '/savings/onboarding/residencyandcommunication',

  'savings_signup':                           () => '/savings/signup',
  'verify_email':                             () => '/savings/onboarding/verifyemail',
  'user_security_check':                  () => '/savings/onboarding/partialmatchverification',
  'user_security_questions':                  () => '/savings/onboarding/partialmatchverification',
  'savings_security_questions_journey':       () => '/savings/servicing/securityquestions',
  'savings_details':                          () => '/savings/onboarding/bankdetails',
  'savings_journey_completed':                () => '/savings/servicing/congratulations',
  'savings_overview':                         () => '/savings/servicing',

  'end_of_term_choices':                      () => '/savings/servicing/endofterm',
  'end_of_term_election_summary':             () => '/savings/servicing/endofterm/electionsummary',
  'end_of_term_election_person_details':      () => '/savings/servicing/endofterm/electionpersondetails',
  'end_of_term_election_reinvest_amount':     () => '/savings/servicing/endofterm/electionreinvestamount',
  'end_of_term_election_documents':           () => '/savings/servicing/endofterm/electiondocuments',
  'end_of_term_election_success':             () => '/savings/servicing/endofterm/electionsuccess',

  'default':                                  () => (''),
};


export const savingsApiURLs = {
  'smartsave_customer_details':               () => '/savings/smartsave_yourdetails',
  'savings_customer_person_details':          () => '/savings/your_details/',
  'savings_customer_address_details':         () => '/savings/your_address/',
  'savings_customer_residency_comm_details':  () => '/savings/residency_and_comm/',
  'savings_signup':                           () => '/savings/signup',
  'savings_security_questions_journey':       () => '/savings/security/',
  'savings_details':                          () => '/savings/deposit/',
  'savings_overview':                         () => '/savings/overview/',
  'savings_journey_completed':                () => '/savings/completed/',
  'savings_bank_account_update_start':        () => '/savings/account/bank_account_update/start',
  'savings_bank_account_update_end':          () => '/savings/account/bank_account_update/end',

  'savings_bank_account_update_wid_start':    () => '/savings/account/bank_account_update_wid_start',
  'savings_bank_account_update_wid_end':      () => '/savings/account/bank_account_update_wid_end',

  'savings_address_update_start':             () => '/savings/account/address_update/start',
  'savings_address_update_end':               () => '/savings/account/address_update/end',
  'verify_email':                             () => '',
  'savings_account':                         () => '/savings/account/',
};

export const getUrlsForJourneyType = (urlType) => {
  const lendingUrls = urlType === 'api' ? lendingApiURLs : lendingAppURLs;
  const savingsUrls = urlType === 'api' ? savingsApiURLs : savingsAppURLs;
  let urlSelector = {};
  let journeyType = localStorage.getItem('journeyType');
  if(journeyType === 'null' ) {
    if (window.location.pathname.includes('savings')) journeyType = 'savings';
    if (window.location.pathname.includes('lending')) journeyType = 'lending';
  }
  if (journeyType === 'lending') urlSelector = lendingUrls;
  if (journeyType === 'savings') urlSelector = savingsUrls;
  return urlSelector;
};

export const appUrlMapper = (nextAction) => { // frontend routes
  const urlSelector = getUrlsForJourneyType('app');
  return (urlSelector[nextAction] || urlSelector.default)();
};


export const apiUrlMapper = (nextAction) => { // backend routes
  const urlSelector = getUrlsForJourneyType('api');
  return (urlSelector[nextAction] || urlSelector.default)();
};
