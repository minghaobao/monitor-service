-- 创建ngp_monitor数据库的表结构
USE ngp_monitor;

-- 合约注册表
CREATE TABLE IF NOT EXISTS `contracts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chain_id` bigint NOT NULL,
  `address` varchar(42) NOT NULL,
  `name` varchar(50) NOT NULL,
  `abi_version` varchar(20) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `contracts_address_chain_id_key` (`address`,`chain_id`),
  KEY `contracts_chain_id_idx` (`chain_id`),
  KEY `contracts_address_idx` (`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 区块信息
CREATE TABLE IF NOT EXISTS `blocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chain_id` bigint NOT NULL,
  `block_number` bigint NOT NULL,
  `block_hash` varchar(66) NOT NULL,
  `parent_hash` varchar(66) NOT NULL,
  `timestamp` datetime(3) NOT NULL,
  `finalized` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `blocks_chain_id_block_number_key` (`chain_id`,`block_number`),
  UNIQUE KEY `blocks_chain_id_block_hash_key` (`chain_id`,`block_hash`),
  KEY `blocks_chain_id_idx` (`chain_id`),
  KEY `blocks_block_number_idx` (`block_number`),
  KEY `blocks_block_hash_idx` (`block_hash`),
  KEY `blocks_chain_id_timestamp_idx` (`chain_id`,`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 链上事件
CREATE TABLE IF NOT EXISTS `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chain_id` bigint NOT NULL,
  `block_number` bigint NOT NULL,
  `tx_hash` varchar(66) NOT NULL,
  `log_index` int NOT NULL,
  `contract_address` varchar(42) NOT NULL,
  `event_name` varchar(100) NOT NULL,
  `event_signature` varchar(100) NOT NULL,
  `args` json DEFAULT NULL,
  `removed` tinyint(1) NOT NULL DEFAULT '0',
  `timestamp` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `events_chain_id_tx_hash_log_index_key` (`chain_id`,`tx_hash`,`log_index`),
  KEY `events_chain_id_idx` (`chain_id`),
  KEY `events_block_number_idx` (`block_number`),
  KEY `events_tx_hash_idx` (`tx_hash`),
  KEY `events_contract_address_idx` (`contract_address`),
  KEY `events_chain_id_timestamp_idx` (`chain_id`,`timestamp`),
  CONSTRAINT `events_contract_address_chain_id_fkey` FOREIGN KEY (`contract_address`, `chain_id`) REFERENCES `contracts` (`address`, `chain_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 方法调用
CREATE TABLE IF NOT EXISTS `function_calls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chain_id` bigint NOT NULL,
  `block_number` bigint NOT NULL,
  `tx_hash` varchar(66) NOT NULL,
  `contract_address` varchar(42) NOT NULL,
  `method_name` varchar(100) NOT NULL,
  `method_signature` varchar(100) NOT NULL,
  `args` json DEFAULT NULL,
  `from` varchar(42) NOT NULL,
  `value` varchar(78) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `gas_used` bigint NOT NULL,
  `timestamp` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `function_calls_chain_id_tx_hash_key` (`chain_id`,`tx_hash`),
  KEY `function_calls_chain_id_idx` (`chain_id`),
  KEY `function_calls_block_number_idx` (`block_number`),
  KEY `function_calls_tx_hash_idx` (`tx_hash`),
  KEY `function_calls_contract_address_idx` (`contract_address`),
  KEY `function_calls_chain_id_timestamp_idx` (`chain_id`,`timestamp`),
  CONSTRAINT `function_calls_contract_address_chain_id_fkey` FOREIGN KEY (`contract_address`, `chain_id`) REFERENCES `contracts` (`address`, `chain_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 处理进度
CREATE TABLE IF NOT EXISTS `checkpoints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chain_id` bigint NOT NULL,
  `last_processed_block` bigint NOT NULL,
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `checkpoints_chain_id_key` (`chain_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 异常记录
CREATE TABLE IF NOT EXISTS `anomalies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chain_id` bigint NOT NULL,
  `type` varchar(50) NOT NULL,
  `key` varchar(100) NOT NULL,
  `details` json DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `anomalies_chain_id_type_idx` (`chain_id`,`type`),
  KEY `anomalies_chain_id_created_at_idx` (`chain_id`,`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
