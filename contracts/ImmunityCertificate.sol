// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.19;


import "./DoctorRegistry.sol";

contract ImmunityCertificate {
    string public description;
    struct Certificate {
        uint256 timestamp;
        string vaccineSerial;
        address doctor;
        bool revoked;
    }

    mapping (bytes32=>Certificate[]) certificates;
    address public registryContract;

    event CertificateIssued(bytes32 indexed personHash, address indexed doctor, string indexed vaccineSerial, uint256 index);
    event CertificateRevoked(bytes32 indexed personHash, address indexed doctor, string indexed vaccineSerial, address msgSender, uint256 index);

    constructor (address registry, string memory _description) {
        registryContract = registry;
        description = _description;
    }

    modifier onlyDoctor {
        require(DoctorRegistry(registryContract).isDoctor(msg.sender), "IC: Msg.sender must be an approved doctor.");
        _;
    }

    modifier onlyAuthority {
        require(DoctorRegistry(registryContract).isApprovingAuthority(msg.sender), "IC: Msg.sender must be an approving authority.");
        _;
    }

    function issue(bytes32 personHash, uint256 timestamp, string memory vaccineSerial) public onlyDoctor {
        certificates[personHash].push(Certificate({
            timestamp: timestamp,
            vaccineSerial: vaccineSerial,
            doctor: msg.sender,
            revoked: false
        }));
        emit CertificateIssued(personHash, msg.sender, vaccineSerial, certificates[personHash].length - 1);
    }

    function revoke(bytes32 personHash, uint256 certIndex) public onlyAuthority {
        require(certIndex < certificates[personHash].length, "IC: Certificate does not exist.");
        Certificate storage cert = certificates[personHash][certIndex];
        require(!cert.revoked, "IC: Certificate is already revoked.");
        cert.revoked = true;
        emit CertificateRevoked(personHash, cert.doctor, cert.vaccineSerial, msg.sender, certIndex);
    }

    function getLastCertificate(bytes32 personHash) external view
    returns (
        uint256 timestamp,
        string memory vaccineSerial,
        address doctor,
        bool revoked
    ) {
        uint256 length = certificates[personHash].length;
        require(length > 0, "IC: There are no certificates found.");
        Certificate storage cert = certificates[personHash][length - 1];
        timestamp = cert.timestamp;
        vaccineSerial = cert.vaccineSerial;
        doctor = cert.doctor;
        revoked = cert.revoked;
    }

    function getCertificate(bytes32 personHash, uint256 certIndex) external view
    returns (
        uint256 timestamp,
        string memory vaccineSerial,
        address doctor,
        bool revoked
    ) {
        uint256 length = certificates[personHash].length;
        require(certIndex < length, "IC: Certificate with given index does not exist.");
        Certificate storage cert = certificates[personHash][certIndex];
        timestamp = cert.timestamp;
        vaccineSerial = cert.vaccineSerial;
        doctor = cert.doctor;
        revoked = cert.revoked;
    }

    function getCertificateAmount(bytes32 personHash) external view returns (uint256) {
        return certificates[personHash].length;
    }
}
