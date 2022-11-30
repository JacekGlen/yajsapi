export const proposalsInitial = [
  // 0
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:21:05.761Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["http", "https", "gftp"],
        "golem.com.payment.debit-notes.accept-timeout?": 240,
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.00005, 0.0001, 0],
        "golem.com.scheme": "payu",
        "golem.com.scheme.payu.debit-note.interval-sec?": 120,
        "golem.com.scheme.payu.payment-timeout-sec?": 120,
        "golem.com.usage.vector": ["golem.usage.duration_sec", "golem.usage.cpu_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "smx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "hle",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "rtm",
          "deprecate_fpu_cs_ds",
          "mpx",
          "rdseed",
          "adx",
          "smap",
          "clflushopt",
          "processor_trace",
          "sgx",
          "sgx_lc",
        ],
        "golem.inf.cpu.cores": 6,
        "golem.inf.cpu.model": "Stepping 10 Family 6 Model 302",
        "golem.inf.cpu.threads": 1,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 4,
        "golem.inf.storage.gib": 20,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "golem2004",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994561269)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-20a722b5aa370c2ce25fa2621143541ee17fc8654e54ecdd76dd4e76bb83f476",
      issuerId: "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
      state: "Initial",
      timestamp: "2022-11-24T08:21:05.760367Z",
    },
  },
  // 1
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:22:11.470Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["http", "https", "gftp"],
        "golem.com.payment.debit-notes.accept-timeout?": 240,
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0x79d38971d4a484d07925b5919aaf7cab807696f4",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0x79d38971d4a484d07925b5919aaf7cab807696f4",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0x79d38971d4a484d07925b5919aaf7cab807696f4",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0x79d38971d4a484d07925b5919aaf7cab807696f4",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.00005, 0.0001, 0],
        "golem.com.scheme": "payu",
        "golem.com.scheme.payu.debit-note.interval-sec?": 120,
        "golem.com.scheme.payu.payment-timeout-sec?": 120,
        "golem.com.usage.vector": ["golem.usage.duration_sec", "golem.usage.cpu_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "smx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "hle",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "rtm",
          "deprecate_fpu_cs_ds",
          "mpx",
          "rdseed",
          "adx",
          "smap",
          "clflushopt",
          "processor_trace",
          "sgx",
          "sgx_lc",
        ],
        "golem.inf.cpu.cores": 6,
        "golem.inf.cpu.model": "Stepping 10 Family 6 Model 302",
        "golem.inf.cpu.threads": 1,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 4,
        "golem.inf.storage.gib": 20,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "fbwk2t2",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994556583)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-4301c24faa9776388ccf49837b2c60986a039a54c9310592c74908cf3fcd58a0",
      issuerId: "0x79d38971d4a484d07925b5919aaf7cab807696f4",
      state: "Initial",
      timestamp: "2022-11-24T08:22:11.469747Z",
    },
  },
  // 2
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:21:41.400Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["http", "https", "gftp"],
        "golem.com.payment.debit-notes.accept-timeout?": 240,
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0x3a8052f782c55f96be7ffbce22587ed917ad98b9",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0x3a8052f782c55f96be7ffbce22587ed917ad98b9",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0x3a8052f782c55f96be7ffbce22587ed917ad98b9",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0x3a8052f782c55f96be7ffbce22587ed917ad98b9",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.0001, 0.00005, 0],
        "golem.com.scheme": "payu",
        "golem.com.scheme.payu.debit-note.interval-sec?": 120,
        "golem.com.scheme.payu.payment-timeout-sec?": 120,
        "golem.com.usage.vector": ["golem.usage.cpu_sec", "golem.usage.duration_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "smx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "hle",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "rtm",
          "deprecate_fpu_cs_ds",
          "mpx",
          "rdseed",
          "adx",
          "smap",
          "clflushopt",
          "processor_trace",
          "sgx",
          "sgx_lc",
        ],
        "golem.inf.cpu.cores": 6,
        "golem.inf.cpu.model": "Stepping 10 Family 6 Model 302",
        "golem.inf.cpu.threads": 1,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 4,
        "golem.inf.storage.gib": 20,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "michal",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994551780)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-f6224492cb90e492135b9720d8ff8ea0928335357bf1a08b0abfe45dee2103fe",
      issuerId: "0x3a8052f782c55f96be7ffbce22587ed917ad98b9",
      state: "Initial",
      timestamp: "2022-11-24T08:21:41.399655Z",
    },
  },
  // 3
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:21:42.270Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["https", "http", "gftp"],
        "golem.com.payment.debit-notes.accept-timeout?": 240,
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0x44df807cd832393b254378ec33efb65adee837b8",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0x44df807cd832393b254378ec33efb65adee837b8",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0x44df807cd832393b254378ec33efb65adee837b8",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0x44df807cd832393b254378ec33efb65adee837b8",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.00005, 0.0001, 0],
        "golem.com.scheme": "payu",
        "golem.com.scheme.payu.debit-note.interval-sec?": 120,
        "golem.com.scheme.payu.payment-timeout-sec?": 120,
        "golem.com.usage.vector": ["golem.usage.duration_sec", "golem.usage.cpu_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Xeon(R) CPU E3-1270 v6 @ 3.80GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "smx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "hle",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "rtm",
          "deprecate_fpu_cs_ds",
          "mpx",
          "rdseed",
          "adx",
          "smap",
          "clflushopt",
          "processor_trace",
          "sgx",
        ],
        "golem.inf.cpu.cores": 4,
        "golem.inf.cpu.model": "Stepping 9 Family 6 Model 302",
        "golem.inf.cpu.threads": 2,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 8,
        "golem.inf.storage.gib": 100,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "q53",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994554487)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-96e1f6c59e542dfb5602af5022030f6ce2208f2e702c571888d9aeeabd621fc9",
      issuerId: "0x44df807cd832393b254378ec33efb65adee837b8",
      state: "Initial",
      timestamp: "2022-11-24T08:21:42.270199Z",
    },
  },
  // 4
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:21:46.446Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["https", "http", "gftp"],
        "golem.com.payment.debit-notes.accept-timeout?": 240,
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0x700e83ffc421d43f95c340774d5816b985fcf804",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0x700e83ffc421d43f95c340774d5816b985fcf804",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0x700e83ffc421d43f95c340774d5816b985fcf804",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0x700e83ffc421d43f95c340774d5816b985fcf804",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.00005, 0.0001, 0],
        "golem.com.scheme": "payu",
        "golem.com.scheme.payu.debit-note.interval-sec?": 120,
        "golem.com.scheme.payu.payment-timeout-sec?": 120,
        "golem.com.usage.vector": ["golem.usage.duration_sec", "golem.usage.cpu_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Core(TM) i7-4790K CPU @ 4.00GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "deprecate_fpu_cs_ds",
        ],
        "golem.inf.cpu.cores": 4,
        "golem.inf.cpu.model": "Stepping 3 Family 6 Model 108",
        "golem.inf.cpu.threads": 1,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 4,
        "golem.inf.storage.gib": 20,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "sharkoon_378",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994563392)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-b50df314ed6c2c7710047d445ec5ecc256892c5b7515c3a09461de7fdb27f73e",
      issuerId: "0x700e83ffc421d43f95c340774d5816b985fcf804",
      state: "Initial",
      timestamp: "2022-11-24T08:21:46.445758Z",
    },
  },
  // 5
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:22:05.788Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["http", "https", "gftp"],
        "golem.com.payment.debit-notes.accept-timeout?": 240,
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.0001, 0.00005, 0],
        "golem.com.scheme": "payu",
        "golem.com.scheme.payu.debit-note.interval-sec?": 120,
        "golem.com.scheme.payu.payment-timeout-sec?": 120,
        "golem.com.usage.vector": ["golem.usage.cpu_sec", "golem.usage.duration_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Xeon(R) CPU E3-1270 v6 @ 3.80GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "smx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "hle",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "rtm",
          "deprecate_fpu_cs_ds",
          "mpx",
          "rdseed",
          "adx",
          "smap",
          "clflushopt",
          "processor_trace",
          "sgx",
        ],
        "golem.inf.cpu.cores": 4,
        "golem.inf.cpu.model": "Stepping 9 Family 6 Model 302",
        "golem.inf.cpu.threads": 2,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 8,
        "golem.inf.storage.gib": 100,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "jiuzhang",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994648654)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-2eea8fd0bb37efee7ac1ab9b8c3c08f69e61fca5c3922a1c5e966773a609bc2d",
      issuerId: "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
      state: "Initial",
      timestamp: "2022-11-24T08:22:05.787609Z",
    },
  },
  // 6 - invalid payment platform
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:22:05.788Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["http", "https", "gftp"],
        "golem.com.payment.debit-notes.accept-timeout?": 240,
        "golem.com.payment.platform.erc20-invalid1.address": "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
        "golem.com.payment.platform.erc20--invalid2-tglm.address": "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
        "golem.com.payment.platform.erc20--invalid3-tglm.address": "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
        "golem.com.payment.platform.zksync--invalid4-tglm.address": "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.0001, 0.00005, 0],
        "golem.com.scheme": "payu",
        "golem.com.scheme.payu.debit-note.interval-sec?": 120,
        "golem.com.scheme.payu.payment-timeout-sec?": 120,
        "golem.com.usage.vector": ["golem.usage.cpu_sec", "golem.usage.duration_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Xeon(R) CPU E3-1270 v6 @ 3.80GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "smx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "hle",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "rtm",
          "deprecate_fpu_cs_ds",
          "mpx",
          "rdseed",
          "adx",
          "smap",
          "clflushopt",
          "processor_trace",
          "sgx",
        ],
        "golem.inf.cpu.cores": 4,
        "golem.inf.cpu.model": "Stepping 9 Family 6 Model 302",
        "golem.inf.cpu.threads": 2,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 8,
        "golem.inf.storage.gib": 100,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "jiuzhang",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994648654)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-2eea8fd0bb37efee7ac1ab9b8c3c08f69e61fca5c3922a1c5e966773a609bc2d",
      issuerId: "0x4316e60d7154a99b16d4cd43202017983cdb6bcb",
      state: "Initial",
      timestamp: "2022-11-24T08:22:05.787609Z",
    },
  },
];

export const proposalsDraft = [
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:22:40.471Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["http", "https", "gftp"],
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.00005, 0.0001, 0],
        "golem.com.scheme": "payu",
        "golem.com.usage.vector": ["golem.usage.duration_sec", "golem.usage.cpu_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "smx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "hle",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "rtm",
          "deprecate_fpu_cs_ds",
          "mpx",
          "rdseed",
          "adx",
          "smap",
          "clflushopt",
          "processor_trace",
          "sgx",
          "sgx_lc",
        ],
        "golem.inf.cpu.cores": 6,
        "golem.inf.cpu.model": "Stepping 10 Family 6 Model 302",
        "golem.inf.cpu.threads": 1,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 4,
        "golem.inf.storage.gib": 20,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "golem2004",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994561269)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-818ed14e04477af6ead7aacd7c03ee3bfebadaf5b26924dcb54ae7c2b78274cd",
      issuerId: "0xee8993fe1dcff6b131d3fd759c6b3ddcb82d1655",
      state: "Draft",
      timestamp: "2022-11-24T08:22:40.486195451Z",
      prevProposalId: "R-49263a0d6627e42a3df6650dd513be7748f680d6a119eab0c06f5b118da170c9",
    },
  },
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:26:09.068Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["https", "http", "gftp"],
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0x44df807cd832393b254378ec33efb65adee837b8",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0x44df807cd832393b254378ec33efb65adee837b8",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0x44df807cd832393b254378ec33efb65adee837b8",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0x44df807cd832393b254378ec33efb65adee837b8",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.00005, 0.0001, 0],
        "golem.com.scheme": "payu",
        "golem.com.usage.vector": ["golem.usage.duration_sec", "golem.usage.cpu_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Xeon(R) CPU E3-1270 v6 @ 3.80GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "smx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "hle",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "rtm",
          "deprecate_fpu_cs_ds",
          "mpx",
          "rdseed",
          "adx",
          "smap",
          "clflushopt",
          "processor_trace",
          "sgx",
        ],
        "golem.inf.cpu.cores": 4,
        "golem.inf.cpu.model": "Stepping 9 Family 6 Model 302",
        "golem.inf.cpu.threads": 2,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 8,
        "golem.inf.storage.gib": 100,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "q53",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994554487)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-bc5a613cf03260bb163bdc4343f5c2d783f36ad2ff3eeca07bb7651f7301eec9",
      issuerId: "0x44df807cd832393b254378ec33efb65adee837b8",
      state: "Draft",
      timestamp: "2022-11-24T08:26:09.091332272Z",
      prevProposalId: "R-595633882f910f59f9422da6581628657d9a598757a4d1564ed5c1850e1ea7f1",
    },
  },
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:26:09.155Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["https", "http", "gftp"],
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0x700e83ffc421d43f95c340774d5816b985fcf804",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0x700e83ffc421d43f95c340774d5816b985fcf804",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0x700e83ffc421d43f95c340774d5816b985fcf804",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0x700e83ffc421d43f95c340774d5816b985fcf804",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.00005, 0.0001, 0],
        "golem.com.scheme": "payu",
        "golem.com.usage.vector": ["golem.usage.duration_sec", "golem.usage.cpu_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Core(TM) i7-4790K CPU @ 4.00GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "deprecate_fpu_cs_ds",
        ],
        "golem.inf.cpu.cores": 4,
        "golem.inf.cpu.model": "Stepping 3 Family 6 Model 108",
        "golem.inf.cpu.threads": 1,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 4,
        "golem.inf.storage.gib": 20,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "sharkoon_378",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994563392)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-de45ac1f188cc45a7800fced225a18bc65168f9c9d0e780c2d75962b834aab38",
      issuerId: "0x700e83ffc421d43f95c340774d5816b985fcf804",
      state: "Draft",
      timestamp: "2022-11-24T08:26:09.139536649Z",
      prevProposalId: "R-4e84f800b07564757b6c952946e1019d89633b999c992356efaee23be7aa92a4",
    },
  },
  {
    eventType: "ProposalEvent",
    eventDate: "2022-11-24T08:26:43.283Z",
    proposal: {
      properties: {
        "golem.activity.caps.transfer.protocol": ["gftp", "https", "http"],
        "golem.com.payment.platform.erc20-goerli-tglm.address": "0xccf5d4e9f6dcfc553e7a4ba6a08b8b3e4fd785a2",
        "golem.com.payment.platform.erc20-mumbai-tglm.address": "0xccf5d4e9f6dcfc553e7a4ba6a08b8b3e4fd785a2",
        "golem.com.payment.platform.erc20-rinkeby-tglm.address": "0xccf5d4e9f6dcfc553e7a4ba6a08b8b3e4fd785a2",
        "golem.com.payment.platform.zksync-rinkeby-tglm.address": "0xccf5d4e9f6dcfc553e7a4ba6a08b8b3e4fd785a2",
        "golem.com.pricing.model": "linear",
        "golem.com.pricing.model.linear.coeffs": [0.0001, 0.00005, 0],
        "golem.com.scheme": "payu",
        "golem.com.usage.vector": ["golem.usage.cpu_sec", "golem.usage.duration_sec"],
        "golem.inf.cpu.architecture": "x86_64",
        "golem.inf.cpu.brand": "Intel(R) Core(TM) i7-4790K CPU @ 4.00GHz",
        "golem.inf.cpu.capabilities": [
          "sse3",
          "pclmulqdq",
          "dtes64",
          "monitor",
          "dscpl",
          "vmx",
          "eist",
          "tm2",
          "ssse3",
          "fma",
          "cmpxchg16b",
          "pdcm",
          "pcid",
          "sse41",
          "sse42",
          "x2apic",
          "movbe",
          "popcnt",
          "tsc_deadline",
          "aesni",
          "xsave",
          "osxsave",
          "avx",
          "f16c",
          "rdrand",
          "fpu",
          "vme",
          "de",
          "pse",
          "tsc",
          "msr",
          "pae",
          "mce",
          "cx8",
          "apic",
          "sep",
          "mtrr",
          "pge",
          "mca",
          "cmov",
          "pat",
          "pse36",
          "clfsh",
          "ds",
          "acpi",
          "mmx",
          "fxsr",
          "sse",
          "sse2",
          "ss",
          "htt",
          "tm",
          "pbe",
          "fsgsbase",
          "adjust_msr",
          "bmi1",
          "avx2",
          "smep",
          "bmi2",
          "rep_movsb_stosb",
          "invpcid",
          "deprecate_fpu_cs_ds",
        ],
        "golem.inf.cpu.cores": 4,
        "golem.inf.cpu.model": "Stepping 3 Family 6 Model 108",
        "golem.inf.cpu.threads": 1,
        "golem.inf.cpu.vendor": "GenuineIntel",
        "golem.inf.mem.gib": 4,
        "golem.inf.storage.gib": 20,
        "golem.node.debug.subnet": "devnet-beta",
        "golem.node.id.name": "sharkoon_379",
        "golem.runtime.capabilities": ["vpn"],
        "golem.runtime.name": "vm",
        "golem.runtime.version": "0.2.11",
        "golem.srv.caps.multi-activity": true,
      },
      constraints: "(&\n  (golem.srv.comp.expiration>1667994562764)\n  (golem.node.debug.subnet=devnet-beta)\n)",
      proposalId: "R-5dcfc5bff6348573ea4512f23125d21275db1c158a6816ac3ed83ae3ba518d92",
      issuerId: "0xccf5d4e9f6dcfc553e7a4ba6a08b8b3e4fd785a2",
      state: "Draft",
      timestamp: "2022-11-24T08:26:43.307984303Z",
      prevProposalId: "R-bc46f25fe3cdfd5af890d6dd64d8e664680dcd51e0c479ca4cabd022ce1e5c8f",
    },
  },
];
