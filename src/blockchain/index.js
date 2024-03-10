import web3 from 'web3';
import { registryAbi, immunityCertificateAbi } from './abis';
import { registryAddress, certificateAddress } from './contractAddresses';

export const enableEthereum = async () => {
  if (window.ethereum) {
    window.web3 = new web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch {
      return false;
    }
    onEthereumEnabled();
    return true;
  }
  return false;
};

const getRegistryContract = () =>
  new window.web3.eth.Contract(registryAbi, registryAddress);
const getCertificateContract = () =>
  new window.web3.eth.Contract(immunityCertificateAbi, certificateAddress);

export const isAuthority = async (address) =>
  await getRegistryContract().methods.isApprovingAuthority(address).call();
export const isDoctor = async (address) =>
  await getRegistryContract().methods.isDoctor(address).call();

const onEthereumEnabled = () => {
  const registryContract = getRegistryContract();
  const certificateContract = getCertificateContract();

  const getSender = async () => (await window.web3.eth.getAccounts())[0];
  const getDoctorId = async (address) =>
    await registryContract.methods.doctorId(address).call();
  const approveDoctor = async (doctorAddress, doctorId) =>
    await registryContract.methods
      .approve(doctorAddress, doctorId)
      .send({ from: await getSender() });

  const getLastCertificate = async (address) => {
    try {
      return await certificateContract.methods
        .getLastCertificate(address)
        .call();
    } catch {
      return null;
    }
  };
  const issueCertificate = async (personHash, timestamp, vaccineSerial) => {
    await certificateContract.methods
      .issue(personHash, timestamp, vaccineSerial)
      .send({ from: await getSender() });
  };

  const getCertificateAmount = async (personHash) =>
    await certificateContract.methods.getCertificateAmount(personHash).call();

  const revokeCertificate = async (personHash, certificateIndex) =>
    await certificateContract.methods
      .revoke(personHash, certificateIndex)
      .send({ from: await getSender() });

  window.getDoctorId = getDoctorId;
  window.approveDoctor = approveDoctor;
  window.getLastCertificate = getLastCertificate;
  window.issueCertificate = issueCertificate;
  window.revokeCertificate = revokeCertificate;
  window.getCertificateAmount = getCertificateAmount;
};
