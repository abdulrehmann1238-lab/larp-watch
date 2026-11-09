import { AdminStats } from '../types';

export const ADMIN_STATS_DATA: AdminStats = {
  totalUsers: 14280,
  totalTransformations: 98450,
  activeSubscriptions: 3820,
  estimatedRevenue: '$148,200',
  processingSuccessRate: 99.4,
  dailyVolume: [
    { date: 'Nov 03', transformations: 3120, newUsers: 145 },
    { date: 'Nov 04', transformations: 3450, newUsers: 168 },
    { date: 'Nov 05', transformations: 3890, newUsers: 210 },
    { date: 'Nov 06', transformations: 4210, newUsers: 245 },
    { date: 'Nov 07', transformations: 4680, newUsers: 290 },
    { date: 'Nov 08', transformations: 5120, newUsers: 320 },
    { date: 'Nov 09', transformations: 5430, newUsers: 340 }
  ],
  brandDistribution: [
    { brand: 'Rolex', count: 38400, percentage: 39 },
    { brand: 'Patek Philippe', count: 21600, percentage: 22 },
    { brand: 'Audemars Piguet', count: 15700, percentage: 16 },
    { brand: 'Cartier', count: 9800, percentage: 10 },
    { brand: 'Omega', count: 7850, percentage: 8 },
    { brand: 'Others (Blancpain, JLC, VC)', count: 5100, percentage: 5 }
  ],
  recentTransformations: [
    {
      id: 'tx-9941',
      userName: 'Julian Vance',
      watchBrand: 'Patek Philippe',
      watchModel: 'Nautilus 5711/1A',
      timestamp: '2 mins ago',
      status: 'Completed',
      latencySec: 4.8
    },
    {
      id: 'tx-9940',
      userName: 'Elena Rostova',
      watchBrand: 'Audemars Piguet',
      watchModel: 'Royal Oak 15510ST',
      timestamp: '5 mins ago',
      status: 'Completed',
      latencySec: 5.1
    },
    {
      id: 'tx-9939',
      userName: 'Marcus Sterling',
      watchBrand: 'Rolex',
      watchModel: 'Cosmograph Daytona 126500LN',
      timestamp: '11 mins ago',
      status: 'Completed',
      latencySec: 4.6
    },
    {
      id: 'tx-9938',
      userName: 'Sophie Chen',
      watchBrand: 'Cartier',
      watchModel: 'Santos de Cartier Large',
      timestamp: '18 mins ago',
      status: 'Completed',
      latencySec: 4.2
    },
    {
      id: 'tx-9937',
      userName: 'David Miller',
      watchBrand: 'Blancpain',
      watchModel: 'Villeret Tourbillon Carrousel',
      timestamp: '24 mins ago',
      status: 'Completed',
      latencySec: 6.3
    },
    {
      id: 'tx-9936',
      userName: 'Amara Okafor',
      watchBrand: 'Omega',
      watchModel: 'Speedmaster Professional Moonwatch',
      timestamp: '32 mins ago',
      status: 'Completed',
      latencySec: 4.9
    }
  ]
};

export const ADMIN_USERS_LIST = [
  { id: 'usr-1', name: 'Alexandre Laurent', email: 'alexandre.laurent@horology-atelier.ch', tier: 'Premium', status: 'Active', joinedDate: '2026-09-12', totalTx: 48 },
  { id: 'usr-2', name: 'Sophia DeWitt', email: 'sophia@dewitt-design.com', tier: 'Elite', status: 'Active', joinedDate: '2026-08-04', totalTx: 192 },
  { id: 'usr-3', name: 'Maximilian Vance', email: 'max.vance@geneva-capital.ch', tier: 'Elite', status: 'Active', joinedDate: '2026-07-21', totalTx: 245 },
  { id: 'usr-4', name: 'Chloe Dubois', email: 'chloe.dubois@vogue-luxury.fr', tier: 'Premium', status: 'Active', joinedDate: '2026-10-01', totalTx: 34 },
  { id: 'usr-5', name: 'Henrik Lindqvist', email: 'henrik@nordic-collectors.se', tier: 'Free', status: 'Active', joinedDate: '2026-11-02', totalTx: 3 },
  { id: 'usr-6', name: 'Kenji Takahashi', email: 'kenji.takahashi@tokyo-watch.jp', tier: 'Premium', status: 'Active', joinedDate: '2026-09-28', totalTx: 82 }
];

