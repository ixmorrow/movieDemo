"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("@solana/web3.js"), Connection = _a.Connection, sendAndConfirmTransaction = _a.sendAndConfirmTransaction, Keypair = _a.Keypair, Transaction = _a.Transaction, SystemProgram = _a.SystemProgram, PublicKey = _a.PublicKey, TransactionInstruction = _a.TransactionInstruction, SYSVAR_RENT_PUBKEY = _a.SYSVAR_RENT_PUBKEY;
var buffer_1 = require("buffer");
var borsh = __importStar(require("@project-serum/borsh"));
var RPC_ENDPOINT_URL = "https://api.devnet.solana.com";
var commitment = 'confirmed';
var connection = new Connection(RPC_ENDPOINT_URL, commitment);
var program_id = new PublicKey("4X5hVHsHeGHjLEB9hrUqQ57sEPcYPPfW54fndmQrsgCF");
var feePayer = Keypair.generate();
var userInputIx = function (i, user, userInfo) {
    return new TransactionInstruction({
        keys: [
            {
                pubkey: user,
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: userInfo,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            }
        ],
        data: i,
        programId: program_id,
    });
};
var IX_DATA_LAYOUT = borsh.struct([
    borsh.u8("variant"),
    borsh.str("movie"),
    borsh.u8("rating"),
    borsh.str("message"),
]);
var USER_ACCOUNT_DATA_LAYOUT = borsh.struct([
    borsh.u8("initialized"),
    borsh.u8("rating"),
    borsh.str("movie"),
    borsh.str("message")
]);
function main(movie, description, rating) {
    return __awaiter(this, void 0, void 0, function () {
        var tx, userInfo, payload, msgBuffer, postIxData, ix, signers, txid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Program id: " + program_id.toBase58());
                    console.log("Fee payer: " + feePayer.publicKey);
                    tx = new Transaction();
                    return [4 /*yield*/, PublicKey.findProgramAddress([feePayer.publicKey.toBuffer()], program_id)];
                case 1:
                    userInfo = (_a.sent())[0];
                    console.log("PDA: " + userInfo);
                    payload = {
                        variant: 0,
                        movie: movie,
                        rating: rating,
                        message: description,
                    };
                    msgBuffer = buffer_1.Buffer.alloc(1000);
                    IX_DATA_LAYOUT.encode(payload, msgBuffer);
                    console.log(msgBuffer);
                    postIxData = msgBuffer.slice(0, IX_DATA_LAYOUT.getSpan(msgBuffer));
                    console.log(postIxData);
                    console.log("creating init instruction");
                    ix = userInputIx(postIxData, feePayer.publicKey, userInfo);
                    tx.add(ix);
                    return [4 /*yield*/, connection.getBalance(feePayer.publicKey)];
                case 2:
                    if (!((_a.sent()) < 1.0)) return [3 /*break*/, 4];
                    console.log("Requesting Airdrop of 2 SOL...");
                    return [4 /*yield*/, connection.requestAirdrop(feePayer.publicKey, 2e9)];
                case 3:
                    _a.sent();
                    console.log("Airdrop received");
                    _a.label = 4;
                case 4:
                    signers = [feePayer];
                    console.log("sending tx");
                    return [4 /*yield*/, sendAndConfirmTransaction(connection, tx, signers, {
                            skipPreflight: true,
                            preflightCommitment: "confirmed",
                            confirmation: "confirmed",
                        })];
                case 5:
                    txid = _a.sent();
                    console.log("tx signature " + txid);
                    console.log("https://explorer.solana.com/tx/".concat(txid, "?cluster=devnet"));
                    // sleep to allow time to update
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 6:
                    // sleep to allow time to update
                    _a.sent();
                    fetch(userInfo);
                    return [2 /*return*/];
            }
        });
    });
}
var perPage = 10;
var getPage = function (page, pubkeys) { return __awaiter(void 0, void 0, void 0, function () {
    var paginatedPublicKeys, len, accountsWithData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paginatedPublicKeys = pubkeys.slice((page - 1) * perPage, page * perPage);
                len = paginatedPublicKeys.length;
                if (len === 0) {
                    return [2 /*return*/, []];
                }
                console.log("Fetched", len, "accounts!");
                return [4 /*yield*/, connection.getMultipleAccountsInfo(paginatedPublicKeys)];
            case 1:
                accountsWithData = _a.sent();
                return [2 /*return*/, accountsWithData];
        }
    });
}); };
// orders accounts, but in ascending order - want descending
function fetchOrderedAccounts() {
    return __awaiter(this, void 0, void 0, function () {
        var accounts, accountsWithMsg, sortedAccountsWithMsg, reverseSortedAccounts, accountPublicKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getProgramAccounts(program_id)];
                case 1:
                    accounts = _a.sent();
                    accountsWithMsg = accounts.map(function (_a) {
                        var pubkey = _a.pubkey, account = _a.account;
                        return ({
                            pubkey: pubkey,
                            account: account,
                            userData: USER_ACCOUNT_DATA_LAYOUT.decode(account.data),
                        });
                    });
                    sortedAccountsWithMsg = accountsWithMsg.sort(function (a, b) { return b.userData.message.localeCompare(a.userData.message, { ignorePunctuation: true }); });
                    reverseSortedAccounts = sortedAccountsWithMsg.reverse();
                    accountPublicKeys = reverseSortedAccounts.map(function (account) { return account.pubkey; });
                    return [2 /*return*/, accountPublicKeys];
            }
        });
    });
}
function fetchMultipleAccounts(begin) {
    return __awaiter(this, void 0, void 0, function () {
        var accountsWithoutData, pubkeys, accounts, i, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getProgramAccounts(program_id, {
                        dataSlice: { offset: 0, length: 0 }, // Fetch without any data.
                    })];
                case 1:
                    accountsWithoutData = _a.sent();
                    pubkeys = accountsWithoutData.map(function (account) { return account.pubkey; });
                    return [4 /*yield*/, getPage(begin, pubkeys)];
                case 2:
                    accounts = _a.sent();
                    for (i = 0; i < accounts.length; i++) {
                        userData = USER_ACCOUNT_DATA_LAYOUT.decode(accounts[i].data);
                        console.log("User message:", userData.message);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function order() {
    return __awaiter(this, void 0, void 0, function () {
        var orderAccts, orderAcctsWithData, i, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchOrderedAccounts()];
                case 1:
                    orderAccts = _a.sent();
                    return [4 /*yield*/, getPage(1, orderAccts)];
                case 2:
                    orderAcctsWithData = _a.sent();
                    for (i = 0; i < orderAcctsWithData.length; i++) {
                        userData = USER_ACCOUNT_DATA_LAYOUT.decode(orderAcctsWithData[i].data);
                        console.log("User message:", userData.message);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function fetch(pda) {
    return __awaiter(this, void 0, void 0, function () {
        var account, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getAccountInfo(pda)];
                case 1:
                    account = _a.sent();
                    userData = USER_ACCOUNT_DATA_LAYOUT.decode(account.data);
                    console.log("Movie:", userData.movie);
                    console.log("Rating:", userData.rating);
                    console.log("Description:", userData.message);
                    return [2 /*return*/];
            }
        });
    });
}
var movie = "the other guys";
var description = "the other guys is a very funny movie with lots of Little River Band";
var rating = 5;
//const testPDA = new PublicKey("EtNgdPp6p8bKgmB2jivcUXn8hBvAM6ET82S3wrhGmdQa");
var testPDA2 = new PublicKey("CLs4enTTZSL6UL9bAmNGYnxtMiYh8q8Ly5q1tuA1HLSS");
//order()
//fetchMultipleAccounts(1)
//fetch(testPDA2)
main(movie, description, rating)
    .then(function () {
    console.log("Success");
})
    .catch(function (e) {
    console.error(e);
});
