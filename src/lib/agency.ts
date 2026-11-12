export interface ProjectShares {
  companyShare: number;
  bdShare: number;
  profileOwnerShare: number;
  executionPool: number;
}

export function calculateProjectShares(totalValue: number): ProjectShares {
  const companyShare = totalValue * 0.3;
  const bdShare = totalValue * 0.05;
  const profileOwnerShare = totalValue * 0.05;

  return {
    companyShare,
    bdShare,
    profileOwnerShare,
    executionPool: totalValue - companyShare - bdShare - profileOwnerShare,
  };
}
