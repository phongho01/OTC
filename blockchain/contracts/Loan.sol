// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol';
import 'hardhat/console.sol';

contract Loan {
    using SafeERC20 for IERC20;

    struct Offer {
        uint256 nonceAndMeta;
        address borrower;
        address lender;
        uint256 nftCollateralId;
        address nftCollateralAddress;
        uint256 amount;
        uint128 duration;
        uint256 rate;
    }

    struct OfferInfo {
        Offer offer;
        uint256 timeCreated;
        uint256 timeExpired;
    }

    uint256 public constant FILLED_ORDER = 1;
    uint256 public constant UNFILLED_ORDER = 0;

    bytes32 public constant OFFER_TYPEHASH =
        keccak256(
            'Order(uint256 nonceAndMeta,address borrower,address lender,uint256 nftCollateralId,address nftCollateralAddress,uint256 amount,uint256 duration,uint256 rate)'
        );

    event AcceptedOffer(
        bytes32 indexed offerHash,
        address indexed borrower,
        address indexed lender,
        uint256 nftCollateralId,
        address nftCollateralAddress,
        uint256 amount,
        uint128 duration,
        uint256 rate
    );

    IERC20 public wXCR;

    mapping(bytes32 => OfferInfo) public offerList;

    constructor(address _wXCR) {
        wXCR = IERC20(_wXCR);
    }

    /**  
     @dev Allows borrower to fill complete offer
     @param offer Offer quote to fill
     @param signature Signature of the maker corresponding to the order
    */
    function acceptOffer(Offer calldata offer, bytes calldata signature) external {
        require(offer.amount > 0, 'Invalid amount');
        require(offer.duration > 0, 'Invalid duration');
        require(offer.rate > 0, 'Invalid rate');
        require(offer.borrower == msg.sender, 'Access denied');

        address borrower = offer.borrower;
        address lender = offer.lender;

        bytes32 offerHash = keccak256(abi.encode(OFFER_TYPEHASH, offer));
        address signer = ECDSA.recover(offerHash, signature);
        console.logAddress(signer);
        // require(SignatureChecker.isValidSignatureNow(borrower, offerHash, signature), 'Invalid Signature');

        IERC20(wXCR).safeTransferFrom(lender, borrower, offer.amount);
        IERC721(offer.nftCollateralAddress).safeTransferFrom(borrower, address(this), offer.nftCollateralId);

        offerList[offerHash] = OfferInfo({offer: offer, timeCreated: block.timestamp, timeExpired: block.timestamp + offer.duration});

        emit AcceptedOffer(offerHash, borrower, lender, offer.nftCollateralId, offer.nftCollateralAddress, offer.amount, offer.duration, offer.rate);
    }

    function getOfferHash(Offer memory offer) external pure returns (bytes32) {
        bytes32 offerHash = keccak256(abi.encode(OFFER_TYPEHASH, offer));
        return offerHash;
    }
}
