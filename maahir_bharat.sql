-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 14, 2022 at 08:35 PM
-- Server version: 8.0.31-0ubuntu0.20.04.1
-- PHP Version: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maahir_bharat`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint UNSIGNED NOT NULL,
  `type` enum('pickup','delivery','registered') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `house` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` int DEFAULT NULL,
  `city` int DEFAULT NULL,
  `landmark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `type`, `role_id`, `name`, `email`, `mobile`, `house`, `area`, `pincode`, `state`, `city`, `landmark`, `address`, `created_at`, `updated_at`) VALUES
(1, 'registered', 2, 'Test Business', 'admin@gmail.com', '8800899998', NULL, NULL, NULL, NULL, NULL, NULL, 'New Delhi', '2022-10-06 10:26:40', '2022-10-06 10:26:40'),
(2, 'pickup', 2, 'Test Business', 'admin@gmail.com', '8800899998', NULL, NULL, '110044', 25, 116, NULL, 'New Delhi India', '2022-10-06 10:26:40', '2022-10-06 10:26:40'),
(3, 'registered', 6, 'BCA', 'Vishalsaharma18@gmail.com', '9634091352', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '2022-10-08 01:39:51', '2022-10-08 01:39:51'),
(4, 'pickup', 6, 'BCA', 'Vishalsaharma18@gmail.com', '9634091352', NULL, NULL, '203001', 25, 114, NULL, '62, Inta Rori Bulandshahr', '2022-10-08 01:39:51', '2022-10-08 01:39:51'),
(5, 'registered', 7, 'Vishal n SOns', 'Dhaanikala@gmail.com', '9321753425', NULL, NULL, NULL, NULL, NULL, NULL, 'Mumbai', '2022-10-18 16:47:33', '2022-10-20 12:42:15'),
(6, 'pickup', 7, 'Vishal n SOns', 'Dhaanikala@gmail.com', '9321753425', NULL, NULL, '110000', 25, 116, NULL, 'South East Delhi', '2022-10-18 16:47:33', '2022-10-20 12:42:15'),
(7, 'delivery', 10, 'Samad', 'samad@gmail.com', '9045918966', 'test address', 'saharanpur', '247670', 23, 1, 'south delhi-landmark', NULL, '2022-11-10 08:32:43', '2022-11-10 08:32:43'),
(8, 'registered', 9, 'ALI Garments', 'shahzadali.amiss@gmail.com', '9045918966', NULL, NULL, NULL, NULL, NULL, NULL, 'south Delhi', '2022-11-11 04:13:22', '2022-11-11 04:13:22'),
(9, 'pickup', 9, 'ALI Garments', 'shahzadali.amiss@gmail.com', '9045918966', NULL, NULL, '247670', 4, 60, NULL, 'test picup address', '2022-11-11 04:45:02', '2022-11-11 04:53:19'),
(10, 'delivery', 16, 'Test Customer', 'customer@gmail.com', '7817939116', '512', 'Junagad', '586456', 23, 1, 'extention-4', NULL, '2022-11-12 08:12:14', '2022-11-12 08:12:14');

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_values`
--

CREATE TABLE `attribute_values` (
  `id` bigint UNSIGNED NOT NULL,
  `attribute_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ifsc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `role_id`, `name`, `account_name`, `account_number`, `ifsc`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, NULL, NULL, NULL, NULL, 1, '2022-10-06 10:26:40', '2022-10-06 10:28:33'),
(2, 6, 'XYZ', 'XYZ', '956265985459959', 'IFCA', 1, '2022-10-08 01:39:51', '2022-10-08 01:39:51'),
(3, 7, NULL, NULL, NULL, NULL, 1, '2022-10-18 16:47:33', '2022-10-20 12:42:15'),
(4, 9, 'Mohd Shahzad', NULL, NULL, NULL, 1, '2022-11-11 05:14:23', '2022-11-12 01:51:06'),
(5, 17, NULL, NULL, NULL, NULL, 1, '2022-11-11 07:29:25', '2022-11-12 09:27:44');

-- --------------------------------------------------------

--
-- Table structure for table `banner_ads`
--

CREATE TABLE `banner_ads` (
  `id` bigint UNSIGNED NOT NULL,
  `type` enum('Primary','Secondary') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagline` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Shop Now',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` int NOT NULL,
  `gst` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aadhar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `category_type` enum('1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_type`, `parent_id`, `name`, `status`, `icon`, `image`, `created_at`, `updated_at`) VALUES
(1, '1', NULL, 'Home Decor', 1, NULL, 'image1665070238.jpg', '2022-10-06 10:00:38', '2022-10-06 10:00:38'),
(2, '1', NULL, 'Kitchen & Dining', 1, NULL, 'image1665147854.jpg', '2022-10-07 07:34:14', '2022-10-07 07:34:14'),
(3, '1', NULL, 'Paintings', 1, NULL, 'image1665149855.jpg', '2022-10-07 08:07:35', '2022-10-07 08:07:35');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint UNSIGNED NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_id` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `city`, `state_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'North and Middle Andaman', 32, 1, NULL, NULL),
(2, 'South Andaman', 32, 1, NULL, NULL),
(3, 'Nicobar', 32, 1, NULL, NULL),
(4, 'Adilabad', 1, 1, NULL, NULL),
(5, 'Anantapur', 1, 1, NULL, NULL),
(6, 'Chittoor', 1, 1, NULL, NULL),
(7, 'East Godavari', 1, 1, NULL, NULL),
(8, 'Guntur', 1, 1, NULL, NULL),
(9, 'Hyderabad', 1, 1, NULL, NULL),
(10, 'Kadapa', 1, 1, NULL, NULL),
(11, 'Karimnagar', 1, 1, NULL, NULL),
(12, 'Khammam', 1, 1, NULL, NULL),
(13, 'Krishna', 1, 1, NULL, NULL),
(14, 'Kurnool', 1, 1, NULL, NULL),
(15, 'Mahbubnagar', 1, 1, NULL, NULL),
(16, 'Medak', 1, 1, NULL, NULL),
(17, 'Nalgonda', 1, 1, NULL, NULL),
(18, 'Nellore', 1, 1, NULL, NULL),
(19, 'Nizamabad', 1, 1, NULL, NULL),
(20, 'Prakasam', 1, 1, NULL, NULL),
(21, 'Rangareddi', 1, 1, NULL, NULL),
(22, 'Srikakulam', 1, 1, NULL, NULL),
(23, 'Vishakhapatnam', 1, 1, NULL, NULL),
(24, 'Vizianagaram', 1, 1, NULL, NULL),
(25, 'Warangal', 1, 1, NULL, NULL),
(26, 'West Godavari', 1, 1, NULL, NULL),
(27, 'Anjaw', 3, 1, NULL, NULL),
(28, 'Changlang', 3, 1, NULL, NULL),
(29, 'East Kameng', 3, 1, NULL, NULL),
(30, 'Lohit', 3, 1, NULL, NULL),
(31, 'Lower Subansiri', 3, 1, NULL, NULL),
(32, 'Papum Pare', 3, 1, NULL, NULL),
(33, 'Tirap', 3, 1, NULL, NULL),
(34, 'Dibang Valley', 3, 1, NULL, NULL),
(35, 'Upper Subansiri', 3, 1, NULL, NULL),
(36, 'West Kameng', 3, 1, NULL, NULL),
(37, 'Barpeta', 2, 1, NULL, NULL),
(38, 'Bongaigaon', 2, 1, NULL, NULL),
(39, 'Cachar', 2, 1, NULL, NULL),
(40, 'Darrang', 2, 1, NULL, NULL),
(41, 'Dhemaji', 2, 1, NULL, NULL),
(42, 'Dhubri', 2, 1, NULL, NULL),
(43, 'Dibrugarh', 2, 1, NULL, NULL),
(44, 'Goalpara', 2, 1, NULL, NULL),
(45, 'Golaghat', 2, 1, NULL, NULL),
(46, 'Hailakandi', 2, 1, NULL, NULL),
(47, 'Jorhat', 2, 1, NULL, NULL),
(48, 'Karbi Anglong', 2, 1, NULL, NULL),
(49, 'Karimganj', 2, 1, NULL, NULL),
(50, 'Kokrajhar', 2, 1, NULL, NULL),
(51, 'Lakhimpur', 2, 1, NULL, NULL),
(52, 'Marigaon', 2, 1, NULL, NULL),
(53, 'Nagaon', 2, 1, NULL, NULL),
(54, 'Nalbari', 2, 1, NULL, NULL),
(55, 'North Cachar Hills', 2, 1, NULL, NULL),
(56, 'Sibsagar', 2, 1, NULL, NULL),
(57, 'Sonitpur', 2, 1, NULL, NULL),
(58, 'Tinsukia', 2, 1, NULL, NULL),
(59, 'Araria', 4, 1, NULL, NULL),
(60, 'Aurangabad', 4, 1, NULL, NULL),
(61, 'Banka', 4, 1, NULL, NULL),
(62, 'Begusarai', 4, 1, NULL, NULL),
(63, 'Bhagalpur', 4, 1, NULL, NULL),
(64, 'Bhojpur', 4, 1, NULL, NULL),
(65, 'Buxar', 4, 1, NULL, NULL),
(66, 'Darbhanga', 4, 1, NULL, NULL),
(67, 'Purba Champaran', 4, 1, NULL, NULL),
(68, 'Gaya', 4, 1, NULL, NULL),
(69, 'Gopalganj', 4, 1, NULL, NULL),
(70, 'Jamui', 4, 1, NULL, NULL),
(71, 'Jehanabad', 4, 1, NULL, NULL),
(72, 'Khagaria', 4, 1, NULL, NULL),
(73, 'Kishanganj', 4, 1, NULL, NULL),
(74, 'Kaimur', 4, 1, NULL, NULL),
(75, 'Katihar', 4, 1, NULL, NULL),
(76, 'Lakhisarai', 4, 1, NULL, NULL),
(77, 'Madhubani', 4, 1, NULL, NULL),
(78, 'Munger', 4, 1, NULL, NULL),
(79, 'Madhepura', 4, 1, NULL, NULL),
(80, 'Muzaffarpur', 4, 1, NULL, NULL),
(81, 'Nalanda', 4, 1, NULL, NULL),
(82, 'Nawada', 4, 1, NULL, NULL),
(83, 'Patna', 4, 1, NULL, NULL),
(84, 'Purnia', 4, 1, NULL, NULL),
(85, 'Rohtas', 4, 1, NULL, NULL),
(86, 'Saharsa', 4, 1, NULL, NULL),
(87, 'Samastipur', 4, 1, NULL, NULL),
(88, 'Sheohar', 4, 1, NULL, NULL),
(89, 'Sheikhpura', 4, 1, NULL, NULL),
(90, 'Saran', 4, 1, NULL, NULL),
(91, 'Sitamarhi', 4, 1, NULL, NULL),
(92, 'Supaul', 4, 1, NULL, NULL),
(93, 'Siwan', 4, 1, NULL, NULL),
(94, 'Vaishali', 4, 1, NULL, NULL),
(95, 'Pashchim Champaran', 4, 1, NULL, NULL),
(96, 'Bastar', 36, 1, NULL, NULL),
(97, 'Bilaspur', 36, 1, NULL, NULL),
(98, 'Dantewada', 36, 1, NULL, NULL),
(99, 'Dhamtari', 36, 1, NULL, NULL),
(100, 'Durg', 36, 1, NULL, NULL),
(101, 'Jashpur', 36, 1, NULL, NULL),
(102, 'Janjgir-Champa', 36, 1, NULL, NULL),
(103, 'Korba', 36, 1, NULL, NULL),
(104, 'Koriya', 36, 1, NULL, NULL),
(105, 'Kanker', 36, 1, NULL, NULL),
(106, 'Kawardha', 36, 1, NULL, NULL),
(107, 'Mahasamund', 36, 1, NULL, NULL),
(108, 'Raigarh', 36, 1, NULL, NULL),
(109, 'Rajnandgaon', 36, 1, NULL, NULL),
(110, 'Raipur', 36, 1, NULL, NULL),
(111, 'Surguja', 36, 1, NULL, NULL),
(112, 'Diu', 29, 1, NULL, NULL),
(113, 'Daman', 29, 1, NULL, NULL),
(114, 'Central Delhi', 25, 1, NULL, NULL),
(115, 'East Delhi', 25, 1, NULL, NULL),
(116, 'New Delhi', 25, 1, NULL, NULL),
(117, 'North Delhi', 25, 1, NULL, NULL),
(118, 'North East Delhi', 25, 1, NULL, NULL),
(119, 'North West Delhi', 25, 1, NULL, NULL),
(120, 'South Delhi', 25, 1, NULL, NULL),
(121, 'South West Delhi', 25, 1, NULL, NULL),
(122, 'West Delhi', 25, 1, NULL, NULL),
(123, 'North Goa', 26, 1, NULL, NULL),
(124, 'South Goa', 26, 1, NULL, NULL),
(125, 'Ahmedabad', 5, 1, NULL, NULL),
(126, 'Amreli District', 5, 1, NULL, NULL),
(127, 'Anand', 5, 1, NULL, NULL),
(128, 'Banaskantha', 5, 1, NULL, NULL),
(129, 'Bharuch', 5, 1, NULL, NULL),
(130, 'Bhavnagar', 5, 1, NULL, NULL),
(131, 'Dahod', 5, 1, NULL, NULL),
(132, 'The Dangs', 5, 1, NULL, NULL),
(133, 'Gandhinagar', 5, 1, NULL, NULL),
(134, 'Jamnagar', 5, 1, NULL, NULL),
(135, 'Junagadh', 5, 1, NULL, NULL),
(136, 'Kutch', 5, 1, NULL, NULL),
(137, 'Kheda', 5, 1, NULL, NULL),
(138, 'Mehsana', 5, 1, NULL, NULL),
(139, 'Narmada', 5, 1, NULL, NULL),
(140, 'Navsari', 5, 1, NULL, NULL),
(141, 'Patan', 5, 1, NULL, NULL),
(142, 'Panchmahal', 5, 1, NULL, NULL),
(143, 'Porbandar', 5, 1, NULL, NULL),
(144, 'Rajkot', 5, 1, NULL, NULL),
(145, 'Sabarkantha', 5, 1, NULL, NULL),
(146, 'Surendranagar', 5, 1, NULL, NULL),
(147, 'Surat', 5, 1, NULL, NULL),
(148, 'Vadodara', 5, 1, NULL, NULL),
(149, 'Valsad', 5, 1, NULL, NULL),
(150, 'Ambala', 6, 1, NULL, NULL),
(151, 'Bhiwani', 6, 1, NULL, NULL),
(152, 'Faridabad', 6, 1, NULL, NULL),
(153, 'Fatehabad', 6, 1, NULL, NULL),
(154, 'Gurgaon', 6, 1, NULL, NULL),
(155, 'Hissar', 6, 1, NULL, NULL),
(156, 'Jhajjar', 6, 1, NULL, NULL),
(157, 'Jind', 6, 1, NULL, NULL),
(158, 'Karnal', 6, 1, NULL, NULL),
(159, 'Kaithal', 6, 1, NULL, NULL),
(160, 'Kurukshetra', 6, 1, NULL, NULL),
(161, 'Mahendragarh', 6, 1, NULL, NULL),
(162, 'Mewat', 6, 1, NULL, NULL),
(163, 'Panchkula', 6, 1, NULL, NULL),
(164, 'Panipat', 6, 1, NULL, NULL),
(165, 'Rewari', 6, 1, NULL, NULL),
(166, 'Rohtak', 6, 1, NULL, NULL),
(167, 'Sirsa', 6, 1, NULL, NULL),
(168, 'Sonepat', 6, 1, NULL, NULL),
(169, 'Yamuna Nagar', 6, 1, NULL, NULL),
(170, 'Palwal', 6, 1, NULL, NULL),
(171, 'Bilaspur', 7, 1, NULL, NULL),
(172, 'Chamba', 7, 1, NULL, NULL),
(173, 'Hamirpur', 7, 1, NULL, NULL),
(174, 'Kangra', 7, 1, NULL, NULL),
(175, 'Kinnaur', 7, 1, NULL, NULL),
(176, 'Kulu', 7, 1, NULL, NULL),
(177, 'Lahaul and Spiti', 7, 1, NULL, NULL),
(178, 'Mandi', 7, 1, NULL, NULL),
(179, 'Shimla', 7, 1, NULL, NULL),
(180, 'Sirmaur', 7, 1, NULL, NULL),
(181, 'Solan', 7, 1, NULL, NULL),
(182, 'Una', 7, 1, NULL, NULL),
(183, 'Anantnag', 8, 1, NULL, NULL),
(184, 'Badgam', 8, 1, NULL, NULL),
(185, 'Bandipore', 8, 1, NULL, NULL),
(186, 'Baramula', 8, 1, NULL, NULL),
(187, 'Doda', 8, 1, NULL, NULL),
(188, 'Jammu', 8, 1, NULL, NULL),
(189, 'Kargil', 8, 1, NULL, NULL),
(190, 'Kathua', 8, 1, NULL, NULL),
(191, 'Kupwara', 8, 1, NULL, NULL),
(192, 'Leh', 8, 1, NULL, NULL),
(193, 'Poonch', 8, 1, NULL, NULL),
(194, 'Pulwama', 8, 1, NULL, NULL),
(195, 'Rajauri', 8, 1, NULL, NULL),
(196, 'Srinagar', 8, 1, NULL, NULL),
(197, 'Samba', 8, 1, NULL, NULL),
(198, 'Udhampur', 8, 1, NULL, NULL),
(199, 'Bokaro', 34, 1, NULL, NULL),
(200, 'Chatra', 34, 1, NULL, NULL),
(201, 'Deoghar', 34, 1, NULL, NULL),
(202, 'Dhanbad', 34, 1, NULL, NULL),
(203, 'Dumka', 34, 1, NULL, NULL),
(204, 'Purba Singhbhum', 34, 1, NULL, NULL),
(205, 'Garhwa', 34, 1, NULL, NULL),
(206, 'Giridih', 34, 1, NULL, NULL),
(207, 'Godda', 34, 1, NULL, NULL),
(208, 'Gumla', 34, 1, NULL, NULL),
(209, 'Hazaribagh', 34, 1, NULL, NULL),
(210, 'Koderma', 34, 1, NULL, NULL),
(211, 'Lohardaga', 34, 1, NULL, NULL),
(212, 'Pakur', 34, 1, NULL, NULL),
(213, 'Palamu', 34, 1, NULL, NULL),
(214, 'Ranchi', 34, 1, NULL, NULL),
(215, 'Sahibganj', 34, 1, NULL, NULL),
(216, 'Seraikela and Kharsawan', 34, 1, NULL, NULL),
(217, 'Pashchim Singhbhum', 34, 1, NULL, NULL),
(218, 'Ramgarh', 34, 1, NULL, NULL),
(219, 'Bidar', 9, 1, NULL, NULL),
(220, 'Belgaum', 9, 1, NULL, NULL),
(221, 'Bijapur', 9, 1, NULL, NULL),
(222, 'Bagalkot', 9, 1, NULL, NULL),
(223, 'Bellary', 9, 1, NULL, NULL),
(224, 'Bangalore Rural District', 9, 1, NULL, NULL),
(225, 'Bangalore Urban District', 9, 1, NULL, NULL),
(226, 'Chamarajnagar', 9, 1, NULL, NULL),
(227, 'Chikmagalur', 9, 1, NULL, NULL),
(228, 'Chitradurga', 9, 1, NULL, NULL),
(229, 'Davanagere', 9, 1, NULL, NULL),
(230, 'Dharwad', 9, 1, NULL, NULL),
(231, 'Dakshina Kannada', 9, 1, NULL, NULL),
(232, 'Gadag', 9, 1, NULL, NULL),
(233, 'Gulbarga', 9, 1, NULL, NULL),
(234, 'Hassan', 9, 1, NULL, NULL),
(235, 'Haveri District', 9, 1, NULL, NULL),
(236, 'Kodagu', 9, 1, NULL, NULL),
(237, 'Kolar', 9, 1, NULL, NULL),
(238, 'Koppal', 9, 1, NULL, NULL),
(239, 'Mandya', 9, 1, NULL, NULL),
(240, 'Mysore', 9, 1, NULL, NULL),
(241, 'Raichur', 9, 1, NULL, NULL),
(242, 'Shimoga', 9, 1, NULL, NULL),
(243, 'Tumkur', 9, 1, NULL, NULL),
(244, 'Udupi', 9, 1, NULL, NULL),
(245, 'Uttara Kannada', 9, 1, NULL, NULL),
(246, 'Ramanagara', 9, 1, NULL, NULL),
(247, 'Chikballapur', 9, 1, NULL, NULL),
(248, 'Yadagiri', 9, 1, NULL, NULL),
(249, 'Alappuzha', 10, 1, NULL, NULL),
(250, 'Ernakulam', 10, 1, NULL, NULL),
(251, 'Idukki', 10, 1, NULL, NULL),
(252, 'Kollam', 10, 1, NULL, NULL),
(253, 'Kannur', 10, 1, NULL, NULL),
(254, 'Kasaragod', 10, 1, NULL, NULL),
(255, 'Kottayam', 10, 1, NULL, NULL),
(256, 'Kozhikode', 10, 1, NULL, NULL),
(257, 'Malappuram', 10, 1, NULL, NULL),
(258, 'Palakkad', 10, 1, NULL, NULL),
(259, 'Pathanamthitta', 10, 1, NULL, NULL),
(260, 'Thrissur', 10, 1, NULL, NULL),
(261, 'Thiruvananthapuram', 10, 1, NULL, NULL),
(262, 'Wayanad', 10, 1, NULL, NULL),
(263, 'Alirajpur', 11, 1, NULL, NULL),
(264, 'Anuppur', 11, 1, NULL, NULL),
(265, 'Ashok Nagar', 11, 1, NULL, NULL),
(266, 'Balaghat', 11, 1, NULL, NULL),
(267, 'Barwani', 11, 1, NULL, NULL),
(268, 'Betul', 11, 1, NULL, NULL),
(269, 'Bhind', 11, 1, NULL, NULL),
(270, 'Bhopal', 11, 1, NULL, NULL),
(271, 'Burhanpur', 11, 1, NULL, NULL),
(272, 'Chhatarpur', 11, 1, NULL, NULL),
(273, 'Chhindwara', 11, 1, NULL, NULL),
(274, 'Damoh', 11, 1, NULL, NULL),
(275, 'Datia', 11, 1, NULL, NULL),
(276, 'Dewas', 11, 1, NULL, NULL),
(277, 'Dhar', 11, 1, NULL, NULL),
(278, 'Dindori', 11, 1, NULL, NULL),
(279, 'Guna', 11, 1, NULL, NULL),
(280, 'Gwalior', 11, 1, NULL, NULL),
(281, 'Harda', 11, 1, NULL, NULL),
(282, 'Hoshangabad', 11, 1, NULL, NULL),
(283, 'Indore', 11, 1, NULL, NULL),
(284, 'Jabalpur', 11, 1, NULL, NULL),
(285, 'Jhabua', 11, 1, NULL, NULL),
(286, 'Katni', 11, 1, NULL, NULL),
(287, 'Khandwa', 11, 1, NULL, NULL),
(288, 'Khargone', 11, 1, NULL, NULL),
(289, 'Mandla', 11, 1, NULL, NULL),
(290, 'Mandsaur', 11, 1, NULL, NULL),
(291, 'Morena', 11, 1, NULL, NULL),
(292, 'Narsinghpur', 11, 1, NULL, NULL),
(293, 'Neemuch', 11, 1, NULL, NULL),
(294, 'Panna', 11, 1, NULL, NULL),
(295, 'Rewa', 11, 1, NULL, NULL),
(296, 'Rajgarh', 11, 1, NULL, NULL),
(297, 'Ratlam', 11, 1, NULL, NULL),
(298, 'Raisen', 11, 1, NULL, NULL),
(299, 'Sagar', 11, 1, NULL, NULL),
(300, 'Satna', 11, 1, NULL, NULL),
(301, 'Sehore', 11, 1, NULL, NULL),
(302, 'Seoni', 11, 1, NULL, NULL),
(303, 'Shahdol', 11, 1, NULL, NULL),
(304, 'Shajapur', 11, 1, NULL, NULL),
(305, 'Sheopur', 11, 1, NULL, NULL),
(306, 'Shivpuri', 11, 1, NULL, NULL),
(307, 'Sidhi', 11, 1, NULL, NULL),
(308, 'Singrauli', 11, 1, NULL, NULL),
(309, 'Tikamgarh', 11, 1, NULL, NULL),
(310, 'Ujjain', 11, 1, NULL, NULL),
(311, 'Umaria', 11, 1, NULL, NULL),
(312, 'Vidisha', 11, 1, NULL, NULL),
(313, 'Ahmednagar', 12, 1, NULL, NULL),
(314, 'Akola', 12, 1, NULL, NULL),
(315, 'Amrawati', 12, 1, NULL, NULL),
(316, 'Aurangabad', 12, 1, NULL, NULL),
(317, 'Bhandara', 12, 1, NULL, NULL),
(318, 'Beed', 12, 1, NULL, NULL),
(319, 'Buldhana', 12, 1, NULL, NULL),
(320, 'Chandrapur', 12, 1, NULL, NULL),
(321, 'Dhule', 12, 1, NULL, NULL),
(322, 'Gadchiroli', 12, 1, NULL, NULL),
(323, 'Gondiya', 12, 1, NULL, NULL),
(324, 'Hingoli', 12, 1, NULL, NULL),
(325, 'Jalgaon', 12, 1, NULL, NULL),
(326, 'Jalna', 12, 1, NULL, NULL),
(327, 'Kolhapur', 12, 1, NULL, NULL),
(328, 'Latur', 12, 1, NULL, NULL),
(329, 'Mumbai City', 12, 1, NULL, NULL),
(330, 'Mumbai suburban', 12, 1, NULL, NULL),
(331, 'Nandurbar', 12, 1, NULL, NULL),
(332, 'Nanded', 12, 1, NULL, NULL),
(333, 'Nagpur', 12, 1, NULL, NULL),
(334, 'Nashik', 12, 1, NULL, NULL),
(335, 'Osmanabad', 12, 1, NULL, NULL),
(336, 'Parbhani', 12, 1, NULL, NULL),
(337, 'Pune', 12, 1, NULL, NULL),
(338, 'Raigad', 12, 1, NULL, NULL),
(339, 'Ratnagiri', 12, 1, NULL, NULL),
(340, 'Sindhudurg', 12, 1, NULL, NULL),
(341, 'Sangli', 12, 1, NULL, NULL),
(342, 'Solapur', 12, 1, NULL, NULL),
(343, 'Satara', 12, 1, NULL, NULL),
(344, 'Thane', 12, 1, NULL, NULL),
(345, 'Wardha', 12, 1, NULL, NULL),
(346, 'Washim', 12, 1, NULL, NULL),
(347, 'Yavatmal', 12, 1, NULL, NULL),
(348, 'Bishnupur', 13, 1, NULL, NULL),
(349, 'Churachandpur', 13, 1, NULL, NULL),
(350, 'Chandel', 13, 1, NULL, NULL),
(351, 'Imphal East', 13, 1, NULL, NULL),
(352, 'Senapati', 13, 1, NULL, NULL),
(353, 'Tamenglong', 13, 1, NULL, NULL),
(354, 'Thoubal', 13, 1, NULL, NULL),
(355, 'Ukhrul', 13, 1, NULL, NULL),
(356, 'Imphal West', 13, 1, NULL, NULL),
(357, 'East Garo Hills', 14, 1, NULL, NULL),
(358, 'East Khasi Hills', 14, 1, NULL, NULL),
(359, 'Jaintia Hills', 14, 1, NULL, NULL),
(360, 'Ri-Bhoi', 14, 1, NULL, NULL),
(361, 'South Garo Hills', 14, 1, NULL, NULL),
(362, 'West Garo Hills', 14, 1, NULL, NULL),
(363, 'West Khasi Hills', 14, 1, NULL, NULL),
(364, 'Aizawl', 15, 1, NULL, NULL),
(365, 'Champhai', 15, 1, NULL, NULL),
(366, 'Kolasib', 15, 1, NULL, NULL),
(367, 'Lawngtlai', 15, 1, NULL, NULL),
(368, 'Lunglei', 15, 1, NULL, NULL),
(369, 'Mamit', 15, 1, NULL, NULL),
(370, 'Saiha', 15, 1, NULL, NULL),
(371, 'Serchhip', 15, 1, NULL, NULL),
(372, 'Dimapur', 16, 1, NULL, NULL),
(373, 'Kohima', 16, 1, NULL, NULL),
(374, 'Mokokchung', 16, 1, NULL, NULL),
(375, 'Mon', 16, 1, NULL, NULL),
(376, 'Phek', 16, 1, NULL, NULL),
(377, 'Tuensang', 16, 1, NULL, NULL),
(378, 'Wokha', 16, 1, NULL, NULL),
(379, 'Zunheboto', 16, 1, NULL, NULL),
(380, 'Angul', 17, 1, NULL, NULL),
(381, 'Boudh', 17, 1, NULL, NULL),
(382, 'Bhadrak', 17, 1, NULL, NULL),
(383, 'Bolangir', 17, 1, NULL, NULL),
(384, 'Bargarh', 17, 1, NULL, NULL),
(385, 'Baleswar', 17, 1, NULL, NULL),
(386, 'Cuttack', 17, 1, NULL, NULL),
(387, 'Debagarh', 17, 1, NULL, NULL),
(388, 'Dhenkanal', 17, 1, NULL, NULL),
(389, 'Ganjam', 17, 1, NULL, NULL),
(390, 'Gajapati', 17, 1, NULL, NULL),
(391, 'Jharsuguda', 17, 1, NULL, NULL),
(392, 'Jajapur', 17, 1, NULL, NULL),
(393, 'Jagatsinghpur', 17, 1, NULL, NULL),
(394, 'Khordha', 17, 1, NULL, NULL),
(395, 'Kendujhar', 17, 1, NULL, NULL),
(396, 'Kalahandi', 17, 1, NULL, NULL),
(397, 'Kandhamal', 17, 1, NULL, NULL),
(398, 'Koraput', 17, 1, NULL, NULL),
(399, 'Kendrapara', 17, 1, NULL, NULL),
(400, 'Malkangiri', 17, 1, NULL, NULL),
(401, 'Mayurbhanj', 17, 1, NULL, NULL),
(402, 'Nabarangpur', 17, 1, NULL, NULL),
(403, 'Nuapada', 17, 1, NULL, NULL),
(404, 'Nayagarh', 17, 1, NULL, NULL),
(405, 'Puri', 17, 1, NULL, NULL),
(406, 'Rayagada', 17, 1, NULL, NULL),
(407, 'Sambalpur', 17, 1, NULL, NULL),
(408, 'Subarnapur', 17, 1, NULL, NULL),
(409, 'Sundargarh', 17, 1, NULL, NULL),
(410, 'Karaikal', 27, 1, NULL, NULL),
(411, 'Mahe', 27, 1, NULL, NULL),
(412, 'Puducherry', 27, 1, NULL, NULL),
(413, 'Yanam', 27, 1, NULL, NULL),
(414, 'Amritsar', 18, 1, NULL, NULL),
(415, 'Bathinda', 18, 1, NULL, NULL),
(416, 'Firozpur', 18, 1, NULL, NULL),
(417, 'Faridkot', 18, 1, NULL, NULL),
(418, 'Fatehgarh Sahib', 18, 1, NULL, NULL),
(419, 'Gurdaspur', 18, 1, NULL, NULL),
(420, 'Hoshiarpur', 18, 1, NULL, NULL),
(421, 'Jalandhar', 18, 1, NULL, NULL),
(422, 'Kapurthala', 18, 1, NULL, NULL),
(423, 'Ludhiana', 18, 1, NULL, NULL),
(424, 'Mansa', 18, 1, NULL, NULL),
(425, 'Moga', 18, 1, NULL, NULL),
(426, 'Mukatsar', 18, 1, NULL, NULL),
(427, 'Nawan Shehar', 18, 1, NULL, NULL),
(428, 'Patiala', 18, 1, NULL, NULL),
(429, 'Rupnagar', 18, 1, NULL, NULL),
(430, 'Sangrur', 18, 1, NULL, NULL),
(431, 'Ajmer', 19, 1, NULL, NULL),
(432, 'Alwar', 19, 1, NULL, NULL),
(433, 'Bikaner', 19, 1, NULL, NULL),
(434, 'Barmer', 19, 1, NULL, NULL),
(435, 'Banswara', 19, 1, NULL, NULL),
(436, 'Bharatpur', 19, 1, NULL, NULL),
(437, 'Baran', 19, 1, NULL, NULL),
(438, 'Bundi', 19, 1, NULL, NULL),
(439, 'Bhilwara', 19, 1, NULL, NULL),
(440, 'Churu', 19, 1, NULL, NULL),
(441, 'Chittorgarh', 19, 1, NULL, NULL),
(442, 'Dausa', 19, 1, NULL, NULL),
(443, 'Dholpur', 19, 1, NULL, NULL),
(444, 'Dungapur', 19, 1, NULL, NULL),
(445, 'Ganganagar', 19, 1, NULL, NULL),
(446, 'Hanumangarh', 19, 1, NULL, NULL),
(447, 'Juhnjhunun', 19, 1, NULL, NULL),
(448, 'Jalore', 19, 1, NULL, NULL),
(449, 'Jodhpur', 19, 1, NULL, NULL),
(450, 'Jaipur', 19, 1, NULL, NULL),
(451, 'Jaisalmer', 19, 1, NULL, NULL),
(452, 'Jhalawar', 19, 1, NULL, NULL),
(453, 'Karauli', 19, 1, NULL, NULL),
(454, 'Kota', 19, 1, NULL, NULL),
(455, 'Nagaur', 19, 1, NULL, NULL),
(456, 'Pali', 19, 1, NULL, NULL),
(457, 'Pratapgarh', 19, 1, NULL, NULL),
(458, 'Rajsamand', 19, 1, NULL, NULL),
(459, 'Sikar', 19, 1, NULL, NULL),
(460, 'Sawai Madhopur', 19, 1, NULL, NULL),
(461, 'Sirohi', 19, 1, NULL, NULL),
(462, 'Tonk', 19, 1, NULL, NULL),
(463, 'Udaipur', 19, 1, NULL, NULL),
(464, 'East Sikkim', 20, 1, NULL, NULL),
(465, 'North Sikkim', 20, 1, NULL, NULL),
(466, 'South Sikkim', 20, 1, NULL, NULL),
(467, 'West Sikkim', 20, 1, NULL, NULL),
(468, 'Ariyalur', 21, 1, NULL, NULL),
(469, 'Chennai', 21, 1, NULL, NULL),
(470, 'Coimbatore', 21, 1, NULL, NULL),
(471, 'Cuddalore', 21, 1, NULL, NULL),
(472, 'Dharmapuri', 21, 1, NULL, NULL),
(473, 'Dindigul', 21, 1, NULL, NULL),
(474, 'Erode', 21, 1, NULL, NULL),
(475, 'Kanchipuram', 21, 1, NULL, NULL),
(476, 'Kanyakumari', 21, 1, NULL, NULL),
(477, 'Karur', 21, 1, NULL, NULL),
(478, 'Madurai', 21, 1, NULL, NULL),
(479, 'Nagapattinam', 21, 1, NULL, NULL),
(480, 'The Nilgiris', 21, 1, NULL, NULL),
(481, 'Namakkal', 21, 1, NULL, NULL),
(482, 'Perambalur', 21, 1, NULL, NULL),
(483, 'Pudukkottai', 21, 1, NULL, NULL),
(484, 'Ramanathapuram', 21, 1, NULL, NULL),
(485, 'Salem', 21, 1, NULL, NULL),
(486, 'Sivagangai', 21, 1, NULL, NULL),
(487, 'Tiruppur', 21, 1, NULL, NULL),
(488, 'Tiruchirappalli', 21, 1, NULL, NULL),
(489, 'Theni', 21, 1, NULL, NULL),
(490, 'Tirunelveli', 21, 1, NULL, NULL),
(491, 'Thanjavur', 21, 1, NULL, NULL),
(492, 'Thoothukudi', 21, 1, NULL, NULL),
(493, 'Thiruvallur', 21, 1, NULL, NULL),
(494, 'Thiruvarur', 21, 1, NULL, NULL),
(495, 'Tiruvannamalai', 21, 1, NULL, NULL),
(496, 'Vellore', 21, 1, NULL, NULL),
(497, 'Villupuram', 21, 1, NULL, NULL),
(498, 'Dhalai', 22, 1, NULL, NULL),
(499, 'North Tripura', 22, 1, NULL, NULL),
(500, 'South Tripura', 22, 1, NULL, NULL),
(501, 'West Tripura', 22, 1, NULL, NULL),
(502, 'Almora', 33, 1, NULL, NULL),
(503, 'Bageshwar', 33, 1, NULL, NULL),
(504, 'Chamoli', 33, 1, NULL, NULL),
(505, 'Champawat', 33, 1, NULL, NULL),
(506, 'Dehradun', 33, 1, NULL, NULL),
(507, 'Haridwar', 33, 1, NULL, NULL),
(508, 'Nainital', 33, 1, NULL, NULL),
(509, 'Pauri Garhwal', 33, 1, NULL, NULL),
(510, 'Pithoragharh', 33, 1, NULL, NULL),
(511, 'Rudraprayag', 33, 1, NULL, NULL),
(512, 'Tehri Garhwal', 33, 1, NULL, NULL),
(513, 'Udham Singh Nagar', 33, 1, NULL, NULL),
(514, 'Uttarkashi', 33, 1, NULL, NULL),
(515, 'Agra', 23, 1, NULL, NULL),
(516, 'Allahabad', 23, 1, NULL, NULL),
(517, 'Aligarh', 23, 1, NULL, NULL),
(518, 'Ambedkar Nagar', 23, 1, NULL, NULL),
(519, 'Auraiya', 23, 1, NULL, NULL),
(520, 'Azamgarh', 23, 1, NULL, NULL),
(521, 'Barabanki', 23, 1, NULL, NULL),
(522, 'Badaun', 23, 1, NULL, NULL),
(523, 'Bagpat', 23, 1, NULL, NULL),
(524, 'Bahraich', 23, 1, NULL, NULL),
(525, 'Bijnor', 23, 1, NULL, NULL),
(526, 'Ballia', 23, 1, NULL, NULL),
(527, 'Banda', 23, 1, NULL, NULL),
(528, 'Balrampur', 23, 1, NULL, NULL),
(529, 'Bareilly', 23, 1, NULL, NULL),
(530, 'Basti', 23, 1, NULL, NULL),
(531, 'Bulandshahr', 23, 1, NULL, NULL),
(532, 'Chandauli', 23, 1, NULL, NULL),
(533, 'Chitrakoot', 23, 1, NULL, NULL),
(534, 'Deoria', 23, 1, NULL, NULL),
(535, 'Etah', 23, 1, NULL, NULL),
(536, 'Kanshiram Nagar', 23, 1, NULL, NULL),
(537, 'Etawah', 23, 1, NULL, NULL),
(538, 'Firozabad', 23, 1, NULL, NULL),
(539, 'Farrukhabad', 23, 1, NULL, NULL),
(540, 'Fatehpur', 23, 1, NULL, NULL),
(541, 'Faizabad', 23, 1, NULL, NULL),
(542, 'Gautam Buddha Nagar', 23, 1, NULL, NULL),
(543, 'Gonda', 23, 1, NULL, NULL),
(544, 'Ghazipur', 23, 1, NULL, NULL),
(545, 'Gorkakhpur', 23, 1, NULL, NULL),
(546, 'Ghaziabad', 23, 1, NULL, NULL),
(547, 'Hamirpur', 23, 1, NULL, NULL),
(548, 'Hardoi', 23, 1, NULL, NULL),
(549, 'Mahamaya Nagar', 23, 1, NULL, NULL),
(550, 'Jhansi', 23, 1, NULL, NULL),
(551, 'Jalaun', 23, 1, NULL, NULL),
(552, 'Jyotiba Phule Nagar', 23, 1, NULL, NULL),
(553, 'Jaunpur District', 23, 1, NULL, NULL),
(554, 'Kanpur Dehat', 23, 1, NULL, NULL),
(555, 'Kannauj', 23, 1, NULL, NULL),
(556, 'Kanpur Nagar', 23, 1, NULL, NULL),
(557, 'Kaushambi', 23, 1, NULL, NULL),
(558, 'Kushinagar', 23, 1, NULL, NULL),
(559, 'Lalitpur', 23, 1, NULL, NULL),
(560, 'Lakhimpur Kheri', 23, 1, NULL, NULL),
(561, 'Lucknow', 23, 1, NULL, NULL),
(562, 'Mau', 23, 1, NULL, NULL),
(563, 'Meerut', 23, 1, NULL, NULL),
(564, 'Maharajganj', 23, 1, NULL, NULL),
(565, 'Mahoba', 23, 1, NULL, NULL),
(566, 'Mirzapur', 23, 1, NULL, NULL),
(567, 'Moradabad', 23, 1, NULL, NULL),
(568, 'Mainpuri', 23, 1, NULL, NULL),
(569, 'Mathura', 23, 1, NULL, NULL),
(570, 'Muzaffarnagar', 23, 1, NULL, NULL),
(571, 'Pilibhit', 23, 1, NULL, NULL),
(572, 'Pratapgarh', 23, 1, NULL, NULL),
(573, 'Rampur', 23, 1, NULL, NULL),
(574, 'Rae Bareli', 23, 1, NULL, NULL),
(575, 'Saharanpur', 23, 1, NULL, NULL),
(576, 'Sitapur', 23, 1, NULL, NULL),
(577, 'Shahjahanpur', 23, 1, NULL, NULL),
(578, 'Sant Kabir Nagar', 23, 1, NULL, NULL),
(579, 'Siddharthnagar', 23, 1, NULL, NULL),
(580, 'Sonbhadra', 23, 1, NULL, NULL),
(581, 'Sant Ravidas Nagar', 23, 1, NULL, NULL),
(582, 'Sultanpur', 23, 1, NULL, NULL),
(583, 'Shravasti', 23, 1, NULL, NULL),
(584, 'Unnao', 23, 1, NULL, NULL),
(585, 'Varanasi', 23, 1, NULL, NULL),
(586, 'Birbhum', 24, 1, NULL, NULL),
(587, 'Bankura', 24, 1, NULL, NULL),
(588, 'Bardhaman', 24, 1, NULL, NULL),
(589, 'Darjeeling', 24, 1, NULL, NULL),
(590, 'Dakshin Dinajpur', 24, 1, NULL, NULL),
(591, 'Hooghly', 24, 1, NULL, NULL),
(592, 'Howrah', 24, 1, NULL, NULL),
(593, 'Jalpaiguri', 24, 1, NULL, NULL),
(594, 'Cooch Behar', 24, 1, NULL, NULL),
(595, 'Kolkata', 24, 1, NULL, NULL),
(596, 'Malda', 24, 1, NULL, NULL),
(597, 'Midnapore', 24, 1, NULL, NULL),
(598, 'Murshidabad', 24, 1, NULL, NULL),
(599, 'Nadia', 24, 1, NULL, NULL),
(600, 'North 24 Parganas', 24, 1, NULL, NULL),
(601, 'South 24 Parganas', 24, 1, NULL, NULL),
(602, 'Purulia', 24, 1, NULL, NULL),
(603, 'Uttar Dinajpur', 24, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint UNSIGNED NOT NULL,
  `country_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` int NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_id` int NOT NULL,
  `priority` int DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `role_id`, `type`, `type_id`, `priority`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'p', 2, 2, '531291665071050.jpg', 1, '2022-10-06 10:14:10', '2022-10-06 10:14:10'),
(2, 2, 'p', 2, 3, '388591665071050.jpg', 1, '2022-10-06 10:14:10', '2022-10-06 10:14:10'),
(3, 2, 'p', 1, 2, '466791665071075.jpg', 1, '2022-10-06 10:14:35', '2022-10-06 10:14:35'),
(4, 2, 'p', 1, 3, '376011665071075.jpg', 1, '2022-10-06 10:14:35', '2022-10-06 10:14:35');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_resets_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2021_09_07_135832_create_products_table', 1),
(5, '2021_09_08_050908_create_categories_table', 1),
(6, '2021_09_14_053735_create_attributes_table', 1),
(7, '2021_09_14_061818_create_attribute_values_table', 1),
(8, '2021_09_14_062121_create_product_attributes_table', 1),
(9, '2021_09_28_073926_create_o_t_p_s_table', 1),
(10, '2021_09_30_052112_create_suppliers_table', 1),
(11, '2021_09_30_052744_create_banks_table', 1),
(12, '2021_09_30_052801_create_addresses_table', 1),
(13, '2021_09_30_053433_create_businesses_table', 1),
(14, '2021_10_01_091005_create_users_table', 1),
(15, '2021_10_07_124807_create_images_table', 1),
(16, '2021_10_12_094028_create_orders_table', 1),
(17, '2021_10_12_094046_create_payments_table', 1),
(18, '2021_10_15_112802_create_cities_table', 1),
(19, '2021_10_15_112910_create_states_table', 1),
(20, '2021_10_15_113821_create_countries_table', 1),
(21, '2021_10_16_064104_create_banner_ads_table', 1),
(22, '2021_10_28_092206_create_product_attribute_values_table', 1),
(23, '2022_11_10_131944_create_reviews_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pmt_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `attributes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `final_price` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_in_cart` tinyint(1) NOT NULL DEFAULT '1',
  `status` enum('pending','hold','delivered') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `visitor_id` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_id`, `pmt_id`, `product_id`, `user_id`, `quantity`, `attributes`, `final_price`, `delivery_address`, `is_in_cart`, `status`, `order_time`, `created_at`, `updated_at`, `visitor_id`) VALUES
(1, '5000636e4c1801351', 'OR636e4c17f017c', 1, 10, 1, NULL, '250', 'test address, saharanpur, south delhi-landmark, North and Middle Andaman, UTTAR PRADESH - 247670, Mob - 9045918966', 0, 'pending', '2022-11-11 06:50:24', '2022-11-10 08:18:20', '2022-11-11 13:20:24', '785771668065149'),
(6, '5000636f9a8105d7c', 'OR636f9a8104bb7', 5, 10, 3, NULL, '999', 'test address, saharanpur, south delhi-landmark, North and Middle Andaman, UTTAR PRADESH - 247670, Mob - 9045918966', 0, 'pending', '2022-11-12 06:37:13', '2022-11-12 00:45:24', '2022-11-12 13:07:13', '785771668065149'),
(9, '5000636f9a8105d7c', 'OR636f9a8104bb7', 10, 10, 2, NULL, '110', 'test address, saharanpur, south delhi-landmark, North and Middle Andaman, UTTAR PRADESH - 247670, Mob - 9045918966', 0, 'pending', '2022-11-12 06:37:13', '2022-11-12 06:15:04', '2022-11-12 13:07:13', '785771668065149'),
(10, '5000636fa2c390a1f', 'OR636fa2c38eb78', 88, 16, 2, NULL, '250', '512, Junagad, extention-4, North and Middle Andaman, UTTAR PRADESH - 586456, Mob - 7817939116', 0, 'pending', '2022-11-12 07:12:28', '2022-11-12 08:10:02', '2022-11-12 13:42:28', '785771668065149');

-- --------------------------------------------------------

--
-- Table structure for table `o_t_p_s`
--

CREATE TABLE `o_t_p_s` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `otp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('s','c') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `pmt_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `txn_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pmt_type` enum('cod','wallet','cc','dc','online') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cod',
  `amount` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `pmt_id`, `txn_id`, `pmt_type`, `amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 10, 'OR636e4c17f017c', NULL, 'online', 250, 1, '2022-11-11 07:50:24', '2022-11-11 13:20:24'),
(2, 10, 'OR636f9a8104bb7', NULL, 'online', 3217, 1, '2022-11-12 07:37:13', '2022-11-12 13:07:13'),
(3, 16, 'OR636fa2c38eb78', NULL, 'online', 500, 1, '2022-11-12 08:12:27', '2022-11-12 13:42:28');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` int NOT NULL,
  `grand_category_id` int NOT NULL,
  `parent_category_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mrp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `offer_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `role_id`, `grand_category_id`, `parent_category_id`, `category_id`, `name`, `mrp`, `offer_price`, `image`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 1, NULL, NULL, 'Oval Glass Lamp', '500', '250', 'image99245653563763.jpg', 'Design: This beautiful Oval shaped glass art lamp has small geometrical shapes on its body. It stands elegantly upon a black base.', 1, '2022-10-06 10:10:12', '2022-10-06 10:10:12'),
(2, 2, 1, NULL, NULL, 'Jyoti Wall Hanging Deepak', '680', '256', '554101665071008.jpg', 'Design: This metallic wall hanging deepak is made with intricate paisley design complete with a floral\r\npatterned diya in the centre. It has three brass chain hangings with bells attached at the end to welcome happiness and blessings.\r\n\r\n\r\nDescription: This brass wall hanging deepak is a beauty to behold. Apart from being a decorative art, it is most mesmerising when the diya is lit, throwing its pure light in all directions and chasing negativity away. Its soft and subtle twinkle rings happiness and joy into your lives. Lighting diyas symbolises victory\r\nof good over evil so you should keep these brass diyas lit all night. This will stop negative energies from entering into your space. Place it at the entrance of your house or home mandir to attract divine energies.', 1, '2022-10-06 10:13:28', '2022-10-06 10:13:28'),
(3, 2, 3, NULL, NULL, 'Set Of 4 Nature Shots Satin Matt Texture UV Art Painting', '690', '600', '394711665151133.jpg', 'Decorate your home & office walls with these artistic design Satin Matt Texture Framed UV Art Painting from eCraftIndia. Each design reflects the artistic qualities and time one has taken to design this painting Exquisitely printed and framed, it is also a perfect gifting option for your colleagues, loved ones and family members. These frames don\'t include glass so it is very light weight and wet cloth can be used to clean it.', 1, '2022-10-07 08:28:53', '2022-10-07 08:28:53'),
(4, 7, 1, NULL, NULL, 'Test', '1000', '800', '128211666086162.jpg', 'yte7tdfigpij; gougpihbpib', 1, '2022-10-18 16:42:42', '2022-10-18 16:42:42'),
(5, 7, 2, NULL, NULL, 'Diwali special farsan box', '1200', '999', '141651666247451.jpg', 'Farsan\r\nChakli\r\nChiwda\r\nKaranji\r\nSev\r\nShankar Pali\r\nBesan ladoo', 1, '2022-10-20 13:30:51', '2022-10-20 13:30:51'),
(6, 7, 2, NULL, NULL, 'Dink ladoo', '350', '325', '153011666247597.png', 'Made with jaggery and dryfruits\r\n( No sugar )', 1, '2022-10-20 13:33:17', '2022-10-20 13:33:17'),
(7, 7, 2, NULL, NULL, 'Mahua Ladoo', '400', '350', '420311666247776.png', 'Ingredients\r\nMahua flowers, peanut, jaggery, ambadi seeds , ambadi flower, cow ghee , cardamom', 1, '2022-10-20 13:36:16', '2022-10-20 13:36:16'),
(8, 7, 2, NULL, NULL, 'Soft coconut jaggery chikki', '299', '225', '286191666247905.png', 'Ingredients\r\nCoconut,\r\n kaakvi ( liquid jaggery)', 1, '2022-10-20 13:38:25', '2022-10-20 13:38:25'),
(9, 7, 2, NULL, NULL, 'Jambo black raisin', '300', '265', '548071666247968.png', NULL, 1, '2022-10-20 13:39:28', '2022-10-20 13:39:28'),
(10, 7, 2, NULL, NULL, 'Apple cider vinegar 100ml', '150', '110', '320921666248075.png', NULL, 1, '2022-10-20 13:41:15', '2022-10-20 13:44:16'),
(11, 7, 2, NULL, NULL, 'A2 Cow Ghee', '2500', '2100', '463461666248194.png', 'Made from bilona method\r\n1 litre', 1, '2022-10-20 13:43:14', '2022-10-20 13:43:55'),
(12, 7, 2, NULL, NULL, 'Plantable cracker box', '1299', '890', '236461666249738.jpg', 'Set of 9 handcrafted plackers ( plantable seed crackers ) \r\n100% Biodegradable\r\nAll the seed crackers contain different seeds that can be grown in a pot or the garden area .\r\n\r\nMicrogreens onion , hemp , cucumber, marigold seeds sutli bomb - laxmi bomb - Anar - phuljari - ladi-chakkar rocket -genda-guard roll caps - khuli Ladi\r\nA set of 9 bombs', 1, '2022-10-20 14:08:58', '2022-10-20 14:08:58'),
(13, 7, 2, NULL, NULL, 'Coconut oil', '649', '590', '271681666249821.png', 'Cold pressed oil', 1, '2022-10-20 14:10:21', '2022-10-20 14:10:21'),
(14, 7, 2, NULL, NULL, 'Ground nut oil', '500', '440', '537851666249880.png', 'Cold pressed oil', 1, '2022-10-20 14:11:20', '2022-10-20 14:11:20'),
(15, 7, 2, NULL, NULL, 'Musterd oil', '650', '590', '538491666249955.png', 'Cold pressed oil', 1, '2022-10-20 14:12:35', '2022-10-20 14:12:35'),
(16, 7, 2, NULL, NULL, 'Sunflower oil', '650', '575', '206341666250016.png', 'Cold pressed oil', 1, '2022-10-20 14:13:36', '2022-10-20 14:13:36'),
(17, 7, 2, NULL, NULL, 'Bajra flour', '200', '170', '395881666250649.jpg', NULL, 1, '2022-10-20 14:24:09', '2022-10-20 14:24:09'),
(18, 7, 2, NULL, NULL, 'Jowar flour', '175', '150', '298251666250716.jpg', NULL, 1, '2022-10-20 14:25:16', '2022-10-20 14:25:16'),
(19, 7, 2, NULL, NULL, 'Nachni flour', '169', '150', '403301666250817.png', NULL, 1, '2022-10-20 14:26:57', '2022-10-20 14:26:57'),
(20, 7, 2, NULL, NULL, 'Rice flour', '230', '200', '154661666250869.png', NULL, 1, '2022-10-20 14:27:49', '2022-10-20 14:27:49'),
(21, 7, 2, NULL, NULL, 'Thalipith flour', '300', '270', '131221666250934.jpg', NULL, 1, '2022-10-20 14:28:54', '2022-10-20 14:28:54'),
(22, 7, 2, NULL, NULL, 'Sprouted Khapli wheat', '265', '245', '515721666251035.jpg', NULL, 1, '2022-10-20 14:30:35', '2022-10-20 14:30:35'),
(23, 7, 2, NULL, NULL, 'Semolina ( Suji )', '150', '140', '470891666251101.jpg', NULL, 1, '2022-10-20 14:31:41', '2022-10-20 14:31:41'),
(24, 7, 2, NULL, NULL, 'Peppery oats khakhra', '130', '125', '331501666254531.jpg', NULL, 1, '2022-10-20 15:28:51', '2022-10-20 15:28:51'),
(25, 7, 2, NULL, NULL, 'Punjabi masala khakhra', '130', '126', '427801666254585.jpg', NULL, 1, '2022-10-20 15:29:45', '2022-10-20 15:29:45'),
(26, 7, 2, NULL, NULL, 'Nachni khakhra', '120', '115', '272371666254745.jpg', NULL, 1, '2022-10-20 15:32:25', '2022-10-20 15:32:25'),
(27, 7, 2, NULL, NULL, 'Masala khakhra', '120', '115', '375281666254814.jpg', NULL, 1, '2022-10-20 15:33:34', '2022-10-20 15:33:34'),
(28, 7, 2, NULL, NULL, 'Low calorie khakhra', '120', '115', '332661666254870.jpg', NULL, 1, '2022-10-20 15:34:30', '2022-10-20 15:34:30'),
(29, 7, 2, NULL, NULL, 'Khichdi khakhra', '130', '125', '145061666254974.jpg', NULL, 1, '2022-10-20 15:36:14', '2022-10-20 15:36:14'),
(30, 7, 2, NULL, NULL, 'Breakfast khakhra', '120', '115', '430861666255063.jpg', NULL, 1, '2022-10-20 15:37:43', '2022-10-20 15:37:43'),
(31, 7, 2, NULL, NULL, 'Biryani basmati rice', '265', '250', '335781666256134.jpg', NULL, 1, '2022-10-20 15:55:34', '2022-10-20 15:55:34'),
(32, 7, 2, NULL, NULL, 'Whole coriander', '120', '100', '451661666257182.jpg', NULL, 1, '2022-10-20 16:13:02', '2022-10-20 16:13:02'),
(33, 7, 2, NULL, NULL, 'Green Chhilka moong dal', '250', '225', '108531666257234.png', NULL, 1, '2022-10-20 16:13:54', '2022-10-20 16:13:54'),
(34, 7, 2, NULL, NULL, 'Cinnamon', '100', '70', '422661666258132.jpg', NULL, 1, '2022-10-20 16:28:52', '2022-10-20 16:28:52'),
(35, 7, 2, NULL, NULL, 'Amchur powder', '110', '100', '365081666258182.jpg', NULL, 1, '2022-10-20 16:29:42', '2022-10-20 16:29:42'),
(36, 7, 2, NULL, NULL, 'Hing powder', '150', '130', '516091666258242.jpg', NULL, 1, '2022-10-20 16:30:42', '2022-10-20 16:30:42'),
(37, 7, 2, NULL, NULL, 'Harde powder', '199', '187', '328051666258303.jpg', NULL, 1, '2022-10-20 16:31:43', '2022-10-20 16:31:43'),
(38, 7, 2, NULL, NULL, 'Clove', '100', '75', '283441666258349.jpg', NULL, 1, '2022-10-20 16:32:29', '2022-10-20 16:32:29'),
(39, 7, 2, NULL, NULL, 'Bey leaves', '70', '50', '428611666258451.jpg', NULL, 1, '2022-10-20 16:34:11', '2022-10-20 16:34:11'),
(40, 7, 2, NULL, NULL, 'Flax seeds', '180', '165', '443741666258515.jpg', NULL, 1, '2022-10-20 16:35:15', '2022-10-20 16:35:15'),
(41, 7, 2, NULL, NULL, 'Fenugreek seed', '150', '140', '269791666258609.png', NULL, 1, '2022-10-20 16:36:49', '2022-10-20 16:36:49'),
(42, 7, 2, NULL, NULL, 'Day to day masala', '650', '605', '193921666258689.jpg', NULL, 1, '2022-10-20 16:38:09', '2022-10-20 16:38:09'),
(43, 7, 2, NULL, NULL, 'Turmeric', '400', '385', '475781666258867.jpg', NULL, 1, '2022-10-20 16:41:07', '2022-10-20 16:41:07'),
(44, 7, 2, NULL, NULL, 'Turmeric', '400', '385', '340151666258867.jpg', NULL, 1, '2022-10-20 16:41:07', '2022-10-20 16:41:07'),
(45, 7, 2, NULL, NULL, 'Red kashmiri mirch', '300', '275', '346491666258924.jpg', NULL, 1, '2022-10-20 16:42:04', '2022-10-20 16:42:04'),
(46, 7, 1, NULL, NULL, 'Sabai Grass mat', '120', '100', '493541666332080.png', NULL, 1, '2022-10-21 13:01:20', '2022-10-21 13:01:20'),
(47, 7, 1, NULL, NULL, 'Sabai Grass mat', '120', '100', '330671666332120.png', NULL, 1, '2022-10-21 13:02:00', '2022-10-21 13:02:00'),
(48, 7, 1, NULL, NULL, 'Sabai Grass mat', '150', '120', '315781666332197.png', NULL, 1, '2022-10-21 13:03:17', '2022-10-21 13:03:17'),
(49, 7, 1, NULL, NULL, 'Sabai Grass mat', '150', '120', '387691666332305.png', NULL, 1, '2022-10-21 13:05:05', '2022-10-21 13:05:05'),
(50, 7, 1, NULL, NULL, 'Sabai Grass mat', '150', '120', '330401666332430.png', NULL, 1, '2022-10-21 13:07:10', '2022-10-21 13:07:10'),
(51, 7, 1, NULL, NULL, 'Sabai Grass mat', '150', '120', '128761666332477.png', NULL, 1, '2022-10-21 13:07:57', '2022-10-21 13:07:57'),
(52, 7, 1, NULL, NULL, 'Sabai Grass mat', '250', '200', '410951666332529.png', NULL, 1, '2022-10-21 13:08:49', '2022-10-21 13:08:49'),
(53, 7, 1, NULL, NULL, 'Sabai Grass container', '850', '700', '236411666332596.png', NULL, 1, '2022-10-21 13:09:56', '2022-10-21 13:09:56'),
(54, 7, 1, NULL, NULL, 'Sabai Grass container', '1500', '1400', '141041666332754.png', NULL, 1, '2022-10-21 13:12:34', '2022-10-21 13:12:34'),
(55, 7, 1, NULL, NULL, 'Sabai Grass container', '550', '450', '433101666332976.png', NULL, 1, '2022-10-21 13:16:16', '2022-10-21 13:16:16'),
(56, 7, 1, NULL, NULL, 'Sabai Grass container', '450', '400', '269031666333094.png', NULL, 1, '2022-10-21 13:18:14', '2022-10-21 13:18:14'),
(57, 7, 1, NULL, NULL, 'Sabai Grass container', '1300', '1100', '384631666333146.png', NULL, 1, '2022-10-21 13:19:06', '2022-10-21 13:19:06'),
(58, 7, 1, NULL, NULL, 'Sabai Grass bowl', '650', '600', '313821666333212.png', NULL, 1, '2022-10-21 13:20:12', '2022-10-21 13:20:12'),
(59, 7, 1, NULL, NULL, 'Sabai Grass bowl', '900', '800', '358561666333354.png', NULL, 1, '2022-10-21 13:22:34', '2022-10-21 13:22:34'),
(60, 7, 1, NULL, NULL, 'Sabai Grass bowl', '200', '180', '300241666334433.png', NULL, 1, '2022-10-21 13:40:33', '2022-10-21 13:40:33'),
(61, 7, 1, NULL, NULL, 'Sabai Grass container', '300', '250', '386121666334494.png', NULL, 1, '2022-10-21 13:41:34', '2022-10-21 13:41:34'),
(62, 7, 1, NULL, NULL, 'Sabai Grass bag', '800', '750', '143371666334586.png', NULL, 1, '2022-10-21 13:43:06', '2022-10-21 13:43:06'),
(63, 7, 1, NULL, NULL, 'Sabai Grass bowl', '200', '180', '461491666334626.png', NULL, 1, '2022-10-21 13:43:46', '2022-10-21 13:43:46'),
(64, 7, 1, NULL, NULL, 'Handicraft Horse', '250', '200', '280981666334713.png', NULL, 1, '2022-10-21 13:45:13', '2022-10-21 13:45:13'),
(65, 7, 1, NULL, NULL, 'Handicraft bag', '1300', '1100', '373161666334779.png', NULL, 1, '2022-10-21 13:46:19', '2022-10-21 13:46:19'),
(66, 7, 1, NULL, NULL, 'Handcraft bag', '1500', '1200', '402541666335014.png', NULL, 1, '2022-10-21 13:50:14', '2022-10-21 13:50:14'),
(67, 7, 1, NULL, NULL, 'Handicraft bucket', '1500', '1200', '330021666335067.png', NULL, 1, '2022-10-21 13:51:07', '2022-10-21 13:51:07'),
(68, 7, 1, NULL, NULL, 'Handicraft bowl', '200', '150', '163991666335129.png', NULL, 1, '2022-10-21 13:52:09', '2022-10-21 13:52:09'),
(69, 7, 1, NULL, NULL, 'Handicraft bag', '800', '700', '149561666335188.png', NULL, 1, '2022-10-21 13:53:08', '2022-10-21 13:53:08'),
(70, 7, 1, NULL, NULL, 'Handicraft bag', '600', '450', '443071666335298.png', NULL, 1, '2022-10-21 13:54:58', '2022-10-21 13:54:58'),
(71, 7, 1, NULL, NULL, 'Handicraft bag', '2000', '1800', '499751666335352.png', NULL, 1, '2022-10-21 13:55:52', '2022-10-21 13:55:52'),
(72, 7, 1, NULL, NULL, 'Handicraft bag', '1500', '1200', '515071666335448.png', NULL, 1, '2022-10-21 13:57:28', '2022-10-21 13:57:28'),
(73, 7, 1, NULL, NULL, 'Handicraft bag', '1000', '800', '198911666335522.png', NULL, 1, '2022-10-21 13:58:42', '2022-10-21 13:58:42'),
(74, 7, 1, NULL, NULL, 'Handicraft bag', '950', '700', '106541666335571.png', NULL, 1, '2022-10-21 13:59:31', '2022-10-21 13:59:31'),
(75, 8, 1, NULL, NULL, 'Hand block printed bedsheet', '1500', '1500', '192831666338012.jpg', 'Hand block printed double bedsheet', 1, '2022-10-21 14:40:12', '2022-10-21 14:40:12'),
(76, 8, 1, NULL, NULL, 'Kota saree with exclusive hand block printing', '1500', '1300', '217181666338206.jpg', 'Grey Kota saree with hand block printing and attached border', 1, '2022-10-21 14:43:26', '2022-10-21 14:43:26'),
(77, 8, 1, NULL, NULL, 'Maroon exclusive hand block saree', '6500', '6000', '484921666338290.jpg', 'Maroon hand block Bangalore silk saree with exclusive cut work done on the pallu', 1, '2022-10-21 14:44:50', '2022-10-21 14:44:50'),
(78, 8, 3, NULL, NULL, 'Hand block printed saree', '2500', '1900', '188141666338367.jpg', 'Brown Kanchipuram cotton with exclusive gold hand block printing', 1, '2022-10-21 14:46:07', '2022-10-21 14:46:07'),
(79, 7, 1, NULL, NULL, 'Pattachitra Box', '1700', '1500', '359541666345256.png', NULL, 1, '2022-10-21 16:40:56', '2022-10-21 16:40:56'),
(80, 7, 1, NULL, NULL, 'Pattachitra Box', '1100', '1000', '522631666345307.png', NULL, 1, '2022-10-21 16:41:47', '2022-10-21 16:41:47'),
(81, 7, 1, NULL, NULL, 'Pattachitra Box', '900', '700', '319771666345364.png', NULL, 1, '2022-10-21 16:42:44', '2022-10-21 16:42:44'),
(82, 7, 1, NULL, NULL, 'Pattachitra Box', '900', '700', '485511666345424.png', NULL, 1, '2022-10-21 16:43:44', '2022-10-21 16:43:44'),
(83, 7, 1, NULL, NULL, 'Palm leaf box', '150', '100', '120721666345504.png', NULL, 1, '2022-10-21 16:45:04', '2022-10-21 16:45:04'),
(84, 7, 1, NULL, NULL, 'Golden Grass box', '200', '175', '339181666345767.png', NULL, 1, '2022-10-21 16:49:27', '2022-10-21 16:49:27'),
(85, 7, 1, NULL, NULL, 'Golden Grass box', '750', '600', '514081666345823.png', NULL, 1, '2022-10-21 16:50:23', '2022-10-21 16:50:23'),
(86, 7, 1, NULL, NULL, 'Golden Grass box', '550', '450', '240891666345873.png', NULL, 1, '2022-10-21 16:51:13', '2022-10-21 16:51:13'),
(87, 7, 1, NULL, NULL, 'Golden Grass box', '350', '300', '332631666345911.png', NULL, 1, '2022-10-21 16:51:51', '2022-10-21 16:51:51'),
(88, 9, 3, NULL, NULL, 'test Product', '300', '250', '299111668260052.jpg', 'shows imges shows imgesshows imgesshows imgesshows imgesshows imgesshows imgesshows imgesshows imgesshows imgesshows imgesshows imgesshows imges', 1, '2022-11-12 08:04:12', '2022-11-12 08:04:12');

-- --------------------------------------------------------

--
-- Table structure for table `product_attributes`
--

CREATE TABLE `product_attributes` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` int NOT NULL,
  `attribute_value_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute_values`
--

CREATE TABLE `product_attribute_values` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` int NOT NULL,
  `attribute_id` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_id` int NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `role_id`, `name`, `product_id`, `rating`, `review`, `created_at`, `updated_at`) VALUES
(1, 2, 'juned', 1, 4, 'this is amaging', '2022-11-14 01:23:14', '2022-11-14 01:23:14'),
(2, 2, 'Rohit', 1, 5, 'it is very Nice', '2022-11-14 01:37:02', '2022-11-14 01:37:02'),
(3, 2, 'Mohd Shahzad', 1, 4, 'gfhfhf', '2022-11-14 01:46:16', '2022-11-14 01:46:16'),
(4, 2, 'Mohd Shahzad', 1, 4, 'gfhfhf', '2022-11-14 01:46:59', '2022-11-14 01:46:59'),
(5, 2, 'Mohd Shahzad', 1, 4, 'dfhfj', '2022-11-14 01:48:39', '2022-11-14 01:48:39'),
(6, 2, 'Mohd Shahzad', 1, 4, 'dfdggfg', '2022-11-14 01:52:33', '2022-11-14 01:52:33');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `name`, `country_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ANDHRA PRADESH', 105, 1, NULL, NULL),
(2, 'ASSAM', 105, 1, NULL, NULL),
(3, 'ARUNACHAL PRADESH', 105, 1, NULL, NULL),
(4, 'BIHAR', 105, 1, NULL, NULL),
(5, 'GUJRAT', 105, 1, NULL, NULL),
(6, 'HARYANA', 105, 1, NULL, NULL),
(7, 'HIMACHAL PRADESH', 105, 1, NULL, NULL),
(8, 'JAMMU & KASHMIR', 105, 1, NULL, NULL),
(9, 'KARNATAKA', 105, 1, NULL, NULL),
(10, 'KERALA', 105, 1, NULL, NULL),
(11, 'MADHYA PRADESH', 105, 1, NULL, NULL),
(12, 'MAHARASHTRA', 105, 1, NULL, NULL),
(13, 'MANIPUR', 105, 1, NULL, NULL),
(14, 'MEGHALAYA', 105, 1, NULL, NULL),
(15, 'MIZORAM', 105, 1, NULL, NULL),
(16, 'NAGALAND', 105, 1, NULL, NULL),
(17, 'ORISSA', 105, 1, NULL, NULL),
(18, 'PUNJAB', 105, 1, NULL, NULL),
(19, 'RAJASTHAN', 105, 1, NULL, NULL),
(20, 'SIKKIM', 105, 1, NULL, NULL),
(21, 'TAMIL NADU', 105, 1, NULL, NULL),
(22, 'TRIPURA', 105, 1, NULL, NULL),
(23, 'UTTAR PRADESH', 105, 1, NULL, NULL),
(24, 'WEST BENGAL', 105, 1, NULL, NULL),
(25, 'DELHI', 105, 1, NULL, NULL),
(26, 'GOA', 105, 1, NULL, NULL),
(27, 'PONDICHERY', 105, 1, NULL, NULL),
(28, 'LAKSHDWEEP', 105, 1, NULL, NULL),
(29, 'DAMAN & DIU', 105, 1, NULL, NULL),
(30, 'DADRA & NAGAR', 105, 1, NULL, NULL),
(31, 'CHANDIGARH', 105, 1, NULL, NULL),
(32, 'ANDAMAN & NICOBAR', 105, 1, NULL, NULL),
(33, 'UTTARANCHAL', 105, 1, NULL, NULL),
(34, 'JHARKHAND', 105, 1, NULL, NULL),
(35, 'CHATTISGARH', 105, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` int NOT NULL,
  `gst_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pan_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplier_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplier_mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` int DEFAULT NULL,
  `city` int DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'default.jpg',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `role_id`, `gst_no`, `business_name`, `pan_no`, `business_type`, `supplier_name`, `supplier_mobile`, `state`, `city`, `image`, `is_verified`, `created_at`, `updated_at`) VALUES
(1, 2, '07DUSPK5248M1Z', 'Test Business', 'PAN343543', 'Propritorshio', 'AMISS Engineer', '8800899998', 25, 116, 'sup63701868036473.jpg', 0, '2022-10-06 10:26:40', '2022-10-06 10:28:33'),
(2, 6, '98745632102', 'BCA', 'MNASEKKMANNKKA', 'Business', 'Vishal Sharma', '9634091352', 25, 114, 'sup95467104185963.jpg', 0, '2022-10-08 01:39:51', '2022-10-08 01:39:51'),
(3, 7, 'GST3241354354354', 'Vishal n SOns', 'POAN2.43545', 'Permanent', 'Dhaanikala', '9321753425', 25, 116, 'sup17649872653456.jpg', 0, '2022-10-18 16:47:33', '2022-10-20 12:42:15'),
(4, 9, NULL, 'ALI Garments', NULL, 'N/A', 'Mohd Shahzad', '9045918966', NULL, NULL, 'sup48530133550649.jpg', 0, '2022-11-11 01:05:49', '2022-11-12 02:37:01'),
(5, 17, NULL, NULL, NULL, NULL, 'test supplier', NULL, NULL, NULL, NULL, 0, '2022-11-11 07:15:58', '2022-11-11 07:30:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('s','c','a') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_verified_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `email`, `email_verified_at`, `mobile`, `mobile_verified_at`, `status`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'a', 'admin@gmail.com', NULL, NULL, NULL, 1, '$2a$12$Ke/VJi32CJWVjLz0MpKZMu/OarXFzxd23gPa.UJ4LFm/8l/Ld.M0e', NULL, '2022-10-04 02:48:36', '2022-10-04 02:48:36'),
(2, 'Maahir Supplier', 's', 'supplier@gmail.com', NULL, NULL, NULL, 1, '$2a$12$cG0U7t7zCkAs2i9iHtg7A.6cYEC8qkubZx1Ci0bA70e17KhrnSDWe', NULL, '2022-10-04 02:49:50', '2022-10-04 02:49:50'),
(3, 'IRFAN ALI KHAN', 'c', 'irfan8108@gmail.com', NULL, NULL, NULL, 1, '$2y$10$5Yksp4HyCdbc2eKrQnGh.uYpYO5Gjx8r9xcpDKhr0oJyxMaTFEkMO', NULL, '2022-10-04 02:50:23', '2022-10-04 02:50:23'),
(6, 'Vishal Sharma', 's', 'Vishalsaharma18@gmail.com', NULL, NULL, NULL, 1, '$2y$10$fVs0XUV2By1a3c159B.FH.IKxxTbLUenZ0Kpw/Z62kWtJcbFHdqq6', NULL, '2022-10-08 01:27:20', '2022-10-08 01:27:20'),
(7, 'Dhaanikala', 's', 'Dhaanikala@gmail.com', NULL, NULL, NULL, 1, '$2a$12$1ZMqxM1Hg6T7o0DhP7JVjeOm6OXU5r9kmveb2rJ3hudaIzjR8acGa', 'E5B6OMkBa7zUNucmPVtNCZxFDe7VClb5fwFa2L70m7JA5HRB4WypnHRAFDMy', '2022-10-13 15:09:26', '2022-10-13 15:09:26'),
(8, 'Temptations', 's', 'Temptations@gmail.com', NULL, NULL, NULL, 1, '$2y$10$/6uQW8owEXlwvb.HE61dS.GLVODqBCeGCb3KTh0oK1xjp4J6rEhfy', '8dVv8XVRWOVzVKTWXYav2q6TJYah2RgUzbOGblKJTyNNkRO5ZOeIrCjczQIr', '2022-10-13 17:30:21', '2022-10-13 17:30:21'),
(9, 'Mohd Shahzad', 's', 'shahzadali.amiss@gmail.com', NULL, '9045918966', NULL, 1, '$2y$10$uleoRR9D.j208Pr/0qJfp.o9FFj5UVnINhwFz/nKsi8vjNqB4XRHO', NULL, '2022-11-10 07:25:56', '2022-11-11 01:43:27'),
(10, 'samad', 'c', 'samad@gmail.com', NULL, NULL, NULL, 1, '$2y$10$tTwKseO4IfPPv3rQ9wWp4OMqpkqtmH1WL.UmtE4F4Mke4pvtvqcbu', '7pAmpvXb4DO28dHg7FD3hgk89bWMRZQYMr1shAkE0z4KXiQBSguubbrrtT2w', '2022-11-10 08:06:45', '2022-11-10 08:06:45'),
(16, 'test customer', 'c', 'customer@gmail.com', NULL, NULL, NULL, 1, '$2y$10$YeHJ4cUB2uKKWzVzG7jR/eBv2S2tS6iX3/jqfLpEQrEk2vU7BrrFK', NULL, '2022-11-11 07:07:03', '2022-11-11 07:07:03'),
(17, 'test supplier', 's', 'testsupplier@gmail.com', NULL, NULL, NULL, 1, '$2y$10$VOblUPgLniY6zY5xLotUqOesWyhoA4o.BbF4Uu5uFuFu4r74T9Vvq', NULL, '2022-11-11 07:09:57', '2022-11-11 07:09:57'),
(18, 'test customer', 'c', 'test@gmail.com', NULL, NULL, NULL, 1, '$2y$10$PdAgbQ/V/66bKOIj8MURJuYglvky3wgu7ICGsXR1jll9VL25/DCKe', NULL, '2022-11-11 07:48:11', '2022-11-11 07:48:11'),
(19, 'Ansari', 's', 'ansari@gmail.com', NULL, NULL, NULL, 1, '$2y$10$uVDN.BDEmjHpUinfV6o2rOz5/V2wrvaD59yz4Hsp5/l21YKYTWhY2', NULL, '2022-11-12 07:42:16', '2022-11-12 07:42:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banner_ads`
--
ALTER TABLE `banner_ads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `o_t_p_s`
--
ALTER TABLE `o_t_p_s`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attribute_values`
--
ALTER TABLE `attribute_values`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `banner_ads`
--
ALTER TABLE `banner_ads`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=604;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `o_t_p_s`
--
ALTER TABLE `o_t_p_s`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `product_attributes`
--
ALTER TABLE `product_attributes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
