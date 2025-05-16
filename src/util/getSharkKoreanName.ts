const getSharkNameBySharkType = (sharkType: string): string => {
  const sharkNames: Record<string, string> = {
    whale: '고래상어',
    greenland: '그린란드 상어',
    lemon: '레몬 상어',
    hammerhead: '망치 상어',
    tiger: '뱀 상어',
    megamouth: '넓은 주둥이 상어',
    pyjama: '파자마 상어',
    saw: '톱 상어',
    angel: '천사 상어',
    sand: '모래 상어',
    wobbegong: '애폴렛 상어',
    nurse: '너스 상어',
    reef: '암초 상어',
  };

  return sharkNames[sharkType] || '알 수 없는 상어';
};

export default getSharkNameBySharkType;
