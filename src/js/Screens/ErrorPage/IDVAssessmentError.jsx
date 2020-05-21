import React, { Fragment } from 'react';

const IDVAssessmentError = () => {
  return (
    <Fragment>
      <h1>What informs this decision?</h1>
      <p>We understand that our decision may be a disappointment, so let us explain how we’ve reached it.</p>
      <h1>Our decision</h1>
      <p>As a responsible lender, we always review all the information available to us.</p>
      <p>That way, we can make a fair decision.</p>
      <p>The information we use is what you told us in your application, information we might already know about you and information provided by Credit Reference Agencies.</p>
      <p>When reviewing your information, we promise to only use soft searches, so there’s no impact on your credit rating.</p>
      <p>You can contact our Credit Reference Agency, Equifax, to speak to them about your credit report:</p>
      <p>Equifax Ltd Customer Service Centre, PO Box 10036 Leicester LE3 4FS equifax.co.uk</p>
      <p>If you believe that incorrect information may have affected our decision, you can get in touch with us to review your application.</p>
      <h1>We consider several factors including:</h1>
      <div className='dotted-text-container'>
        <div className='dotted-text'>
          <span className='dot brand-primary' style={{ fontSize: 100, lineHeight: '4px', textAlign: 'left' }}>&middot;</span>
          <p className='info-para'>Your employment status. For example, if you are unemployed or you have only been in your job for a short time.</p>
        </div>
        <div className='dotted-text'>
          <span className='dot brand-primary' style={{ fontSize: 100, lineHeight: '4px', textAlign: 'left' }}>&middot;</span>
          <p className='info-para'>Your residential status. For example, you have lived at your address for only a short time.</p>
        </div>
        <div className='dotted-text'>
          <span className='dot brand-primary' style={{ fontSize: 100, lineHeight: '4px', textAlign: 'left' }}>&middot;</span>
          <p className='info-para'>Your payment history for other loans or credit card repayments.</p>
        </div>
        <div className='dotted-text'>
          <span className='dot brand-primary' style={{ fontSize: 100, lineHeight: '4px', textAlign: 'left' }}>&middot;</span>
          <p className='info-para'>Your current level of borrowing and existing commitments.</p>
        </div>
        <div className='dotted-text'>
          <span className='dot brand-primary' style={{ fontSize: 100, lineHeight: '4px', textAlign: 'left' }}>&middot;</span>
          <p className='info-para'>Any information we already hold about you.</p>
        </div>
      </div>
    </Fragment>
  );
};

export default IDVAssessmentError;
