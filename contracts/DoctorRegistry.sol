// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract DoctorRegistry {
    mapping(address=>bool) public isDoctor;
    mapping(address=>bool) public isApprovingAuthority;
    mapping(address=>string) public doctorId;

    event DoctorApproved(address indexed doctor, address indexed authority);
    event DoctorRevoked(address indexed doctor, address indexed authority);

    constructor (address[] memory authorities) {
        for (uint256 i = 0; i < authorities.length; ++i) {
            isApprovingAuthority[authorities[i]] = true;
        }
    }

    modifier onlyAuthority {
        require(isApprovingAuthority[msg.sender], "TR: Msg.sender must be an approving authority.");
        _;
    }

    function approve(address doctor, string memory id) public onlyAuthority {
        require(!isDoctor[doctor], "TR: Already a doctor.");
        isDoctor[doctor] = true;
        doctorId[doctor] = id;
        emit DoctorApproved(doctor, msg.sender);
    }

    function revoke(address doctor) public onlyAuthority {
        require(isDoctor[doctor], "TR: Not a doctor.");
        isDoctor[doctor] = false;
        delete doctorId[doctor];
        emit DoctorRevoked(doctor, msg.sender);
    }
}
