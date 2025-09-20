export default {
  apps: [
    {
      name: 'monitor-bsc',
      script: 'tsx',
      args: 'src/simple-start.ts start --network bsc',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        NETWORK: 'bsc'
      },
      log_file: './logs/monitor-bsc.log',
      out_file: './logs/monitor-bsc-out.log',
      error_file: './logs/monitor-bsc-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true
    },
    {
      name: 'monitor-bsc-testnet',
      script: 'tsx',
      args: 'src/simple-start.ts start --network bsc-testnet',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        NETWORK: 'bsc-testnet'
      },
      log_file: './logs/monitor-bsc-testnet.log',
      out_file: './logs/monitor-bsc-testnet-out.log',
      error_file: './logs/monitor-bsc-testnet-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true
    },
    {
      name: 'monitor-polygon',
      script: 'tsx',
      args: 'src/simple-start.ts start --network polygon',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        NETWORK: 'polygon'
      },
      log_file: './logs/monitor-polygon.log',
      out_file: './logs/monitor-polygon-out.log',
      error_file: './logs/monitor-polygon-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true
    },
    {
      name: 'monitor-ethereum',
      script: 'tsx',
      args: 'src/simple-start.ts start --network ethereum',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        NETWORK: 'ethereum'
      },
      log_file: './logs/monitor-ethereum.log',
      out_file: './logs/monitor-ethereum-out.log',
      error_file: './logs/monitor-ethereum-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true
    }
  ]
};