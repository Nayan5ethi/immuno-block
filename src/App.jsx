import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header, Navigation } from './core/components';
import {
  IndexView,
  IssueCertificateView,
  DoctorApprovalView,
  CheckImmunityView,
} from './views';
import {
  Message,
  AccountNotConnected,
  MetaMaskNotAvailable,
} from './core/messages';
import { enableEthereum, isAuthority, isDoctor } from './blockchain';

function App() {
  const isMetaMaskAvailable =
    'ethereum' in window && 'isMetaMask' in ethereum && ethereum.isMetaMask;

  const [activeAccount, setActiveAccount] = useState('');
  useEffect(() => {
    if (isMetaMaskAvailable) {
      setActiveAccount(ethereum.selectedAddress);
      enableEthereum();
    }
  }, []);
  isMetaMaskAvailable &&
    ethereum.on('accountsChanged', function (accounts) {
      setActiveAccount(accounts ? accounts[0] : '');
    });

  const [isAuthorityAccount, setIsAuthorityAccount] = useState(false);
  useEffect(() => {
    if (!activeAccount) {
      setIsAuthorityAccount(false);
      return;
    }
    isAuthority(activeAccount).then((result) => {
      setIsAuthorityAccount(result);
    });
  }, [activeAccount]);

  const [isDoctorAccount, setIsDoctorAccount] = useState(false);
  useEffect(() => {
    if (!activeAccount) {
      setIsDoctorAccount(false);
      return;
    }
    isDoctor(activeAccount).then((result) => {
      setIsDoctorAccount(result);
    });
  }, [activeAccount]);

  return (
    <Router>
      <div className='container container-app'>
        <Header title='Immunity Certificates' />
        <Navigation
          isAuthorityAccount={isAuthorityAccount}
          isDoctorAccount={isDoctorAccount}
        />
        <Routes>
          <Route path='/issue-certificate' element={
            <>
              {isMetaMaskAvailable ? (
                !activeAccount && <AccountNotConnected />
              ) : (
                <MetaMaskNotAvailable />
              )}
              {isDoctorAccount ? (
                <IssueCertificateView />
              ) : (
                <Message>This view is accessible only by doctors.</Message>
              )}
            </>
          } />
          <Route path='/check-immunity' element={<CheckImmunityView />} />
          <Route path='/add-doctor' element={
            <>
              {isMetaMaskAvailable ? (
                !activeAccount && <AccountNotConnected />
              ) : (
                <MetaMaskNotAvailable />
              )}
              {isAuthorityAccount ? (
                <DoctorApprovalView />
              ) : (
                <Message>This view is accessible only by Authority.</Message>
              )}
            </>
          } />
          <Route path='/' element={<IndexView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
