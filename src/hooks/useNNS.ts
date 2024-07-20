import { useState, useEffect, useMemo } from 'react';
import { useNnsName } from '@nnsprotocol/resolver-wagmi';

export const formatEthAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
};

const useMemoizedNnsName = (address: `0x${string}`) => {
    const [userWallet, setUserWallet] = useState<string>('');
    const nns = useNnsName({ address });

    useEffect(() => {
        if (nns.status === 'success' && nns.data) {
            setUserWallet(String(nns.data));
        } else {
            setUserWallet(formatEthAddress(address));
        }
    }, [nns, nns.isPending]);

    const memoizedUserWallet = useMemo(() => userWallet, [userWallet]);

    return memoizedUserWallet;
};

export default useMemoizedNnsName;
