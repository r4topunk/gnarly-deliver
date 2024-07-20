import { useEnsName, useEnsAvatar } from 'wagmi';
import { normalize } from 'viem/ens';
import { useState, useEffect, useMemo } from 'react';
import useMemoizedNnsName, { formatEthAddress } from '../hooks/useNNS';

function useEnsDetails(address: `0x${string}`) {
    const nnsName = useMemoizedNnsName(address);
    const { data: ensName, isLoading: ensNameLoading } = useEnsName({ address });
    const { data: ensAvatar, isLoading: ensAvatarLoading } = useEnsAvatar({
        name: ensName ? normalize(ensName) : undefined,
    });

    const isLoading = ensNameLoading || ensAvatarLoading;

    const displayName = useMemo(() => {
        if (nnsName) return nnsName;
        if (ensName) return ensName;
        return formatEthAddress(address);
    }, [nnsName, ensName, address]);

    return {
        ensName: displayName,
        ensAvatar,
        isLoading,
    };
}

export default useEnsDetails;
