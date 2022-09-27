-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1
-- Χρόνος δημιουργίας: 18 Σεπ 2022 στις 19:16:53
-- Έκδοση διακομιστή: 10.4.14-MariaDB
-- Έκδοση PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `web`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `krousma`
--

CREATE TABLE `krousma` (
  `username` varchar(30) NOT NULL,
  `magazi` varchar(40) DEFAULT NULL,
  `pote` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `placetovisit`
--

CREATE TABLE `placetovisit` (
  `username` varchar(30) NOT NULL,
  `magazi` varchar(40) DEFAULT NULL,
  `pote` timestamp NULL DEFAULT current_timestamp(),
  `id_poi` int(40) NOT NULL,
  `ektimhsh` int(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `poi`
--

CREATE TABLE `POI` (
  `id_num` int(40) NOT NULL,
  `type` varchar(80) NOT NULL,
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `lat` float(50) NOT NULL,
  `lng` float(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `user`
--

CREATE TABLE `User` (
  `id_user` int(255) NOT NULL,
  `username` varchar(255) NOT NULL DEFAULT 'unknown',
  `e_mail` varchar(255) NOT NULL DEFAULT 'unknown',
  `passwd` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `user`
--

INSERT INTO `User` (`id_user`, `username`, `e_mail`, `passwd`, `isAdmin`) VALUES
(1, 'Admin123', 'tsizgeorge6@gmail.com', '664819d8c5343676c9225b5ed00a5cdc6f3a1ff3', 1),
(2, 'Admin234', 'tsizgeorge6@gmail.com', '664819d8c5343676c9225b5ed00a5cdc6f3a1ff3', 1),
(5, 'panos111', 'panos1@gmail.com', '383e4fcf7c6757b4a12b320bbaf7ae0b79402529', 0),
(6, 'giorgos111', 'tsizgeorge6@gmail.com', '383e4fcf7c6757b4a12b320bbaf7ae0b79402529', 0),
(7, 'gouvas111', 'tsizgeorge6@gmail.com', '383e4fcf7c6757b4a12b320bbaf7ae0b79402529', 0),
(8, 'mike12345', 'tsizgeorge6@gmail.com', '383e4fcf7c6757b4a12b320bbaf7ae0b79402529', 0);

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `placetovisit`
--
ALTER TABLE `placetovisit`
  ADD KEY `id_poi` (`id_poi`);

--
-- Ευρετήρια για πίνακα `poi`
--
ALTER TABLE `POI`
  ADD PRIMARY KEY (`id_num`);

--
-- Ευρετήρια για πίνακα `user`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `placetovisit`
--
ALTER TABLE `placetovisit`
  MODIFY `id_poi` int(40) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `poi`
--
ALTER TABLE `POI`
  MODIFY `id_num` int(40) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `user`
--
ALTER TABLE `User`
  MODIFY `id_user` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `placetovisit`
--
ALTER TABLE `placetovisit`
  ADD CONSTRAINT `placetovisit_ibfk_1` FOREIGN KEY (`id_poi`) REFERENCES `POI` (`id_num`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
