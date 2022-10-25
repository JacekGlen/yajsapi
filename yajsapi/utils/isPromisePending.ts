enum PromiseState {
    pending     = 'pending',
    fulfilled   = 'fulfilled',
    rejected    = 'rejected',
}

async function promiseState(p: Promise<any>) : Promise<PromiseState> {
    const t = {};
    return await Promise.race([p, t])
        .then(v => (v === t) ? PromiseState.pending : PromiseState.fulfilled)
        .catch(() => PromiseState.rejected);
}

export default async function isPromisePending(p: Promise<any>): Promise<boolean> {
    return await promiseState(p) === PromiseState.pending
}