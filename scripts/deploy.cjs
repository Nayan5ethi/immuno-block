const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const DoctorRegistry = await ethers.getContractFactory('DoctorRegistry');
  const doctorRegistry = await DoctorRegistry.deploy([deployer.address]);

  await doctorRegistry.deployed();

  console.log('DoctorRegistry deployed to:', doctorRegistry.address);

  const ImmunityCertificate = await ethers.getContractFactory(
    'ImmunityCertificate'
  );
  const immunityCertificate = await ImmunityCertificate.deploy(
    doctorRegistry.address,
    'Your Description'
  );

  await immunityCertificate.deployed();

  console.log('ImmunityCertificate deployed to:', immunityCertificate.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
