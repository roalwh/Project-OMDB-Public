-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: drinkdb
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `areas` (
  `araid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '지역번호',
  `region1` varchar(50) NOT NULL COMMENT '지역1차',
  `region2` varchar(50) NOT NULL COMMENT '지역2차',
  PRIMARY KEY (`araid`)
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8mb4 COMMENT='글쓰기 게시판 지역 선택용 박스\r\n술 게시판 입력시 각 리전 선택 후 합쳐서 drink .region 에 입력되도록 동작\r\ndirnk에 \r\n"서울특별시 관악구"\r\n중간 공백 있어야됨';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board` (
  `bid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '게시판번호',
  `uid` bigint(20) DEFAULT NULL COMMENT '사용자 번호',
  `kind` int(11) NOT NULL COMMENT '1-공지, 2-자유, 3-맛집',
  `title` varchar(300) NOT NULL COMMENT '제목',
  `content` varchar(9999) NOT NULL COMMENT '내용',
  `hits` bigint(20) NOT NULL DEFAULT '0' COMMENT '조회수',
  `cdatetime` datetime NOT NULL COMMENT '생성일',
  `udatetime` datetime DEFAULT NULL COMMENT '수정일',
  `dyn` varchar(4) NOT NULL DEFAULT 'N' COMMENT 'Y-삭제, N-미삭제',
  PRIMARY KEY (`bid`),
  KEY `FKl7gd4e7ngfdr6rt8fhikp4dwx` (`uid`),
  CONSTRAINT `FKl7gd4e7ngfdr6rt8fhikp4dwx` FOREIGN KEY (`uid`) REFERENCES `members` (`uid`) ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clike`
--

DROP TABLE IF EXISTS `clike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clike` (
  `rlid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '좋아요 번호',
  `cid` bigint(20) DEFAULT NULL COMMENT '댓글 번호',
  `uid` bigint(20) DEFAULT NULL COMMENT '회원 번호',
  PRIMARY KEY (`rlid`),
  KEY `FKo1n6fs6asciltlsuno3i82lpl` (`uid`),
  KEY `FK9ny5xxmbj5t7eo8u320qbmlkv` (`cid`),
  CONSTRAINT `FK9ny5xxmbj5t7eo8u320qbmlkv` FOREIGN KEY (`cid`) REFERENCES `comments` (`cid`) ON DELETE CASCADE,
  CONSTRAINT `FKo1n6fs6asciltlsuno3i82lpl` FOREIGN KEY (`uid`) REFERENCES `members` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `cid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '댓글번호',
  `uid` bigint(20) DEFAULT NULL COMMENT '회원번호',
  `bid` bigint(20) DEFAULT NULL COMMENT '게시판번호',
  `content` varchar(2000) NOT NULL COMMENT '댓글내용',
  `cdatetime` datetime NOT NULL COMMENT '생성일',
  `udatetime` datetime DEFAULT NULL COMMENT '수정일',
  `dyn` varchar(4) NOT NULL DEFAULT 'N' COMMENT 'Y-삭제, N-미삭제',
  PRIMARY KEY (`cid`),
  KEY `FK3rcbafms99bxaeyjf7okctk70` (`uid`),
  KEY `FKb9cd8s0i8i1tearyfqvwsesk2` (`bid`),
  CONSTRAINT `FK3rcbafms99bxaeyjf7okctk70` FOREIGN KEY (`uid`) REFERENCES `members` (`uid`) ON DELETE NO ACTION,
  CONSTRAINT `FKb9cd8s0i8i1tearyfqvwsesk2` FOREIGN KEY (`bid`) REFERENCES `board` (`bid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `desclist`
--

DROP TABLE IF EXISTS `desclist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desclist` (
  `descid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '매핑번호',
  `dname` varchar(50) NOT NULL COMMENT '코드값',
  `drename` varchar(50) NOT NULL COMMENT '반환값',
  PRIMARY KEY (`descid`),
  UNIQUE KEY `UK_k3feh0jx6f1hi8vlvsw8fq7sh` (`dname`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dimg`
--

DROP TABLE IF EXISTS `dimg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dimg` (
  `imgid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '술 이미지 번호',
  `did` bigint(20) DEFAULT NULL COMMENT '술번호',
  `iname` varchar(1000) NOT NULL COMMENT '이미지 이름',
  `path` varchar(1000) NOT NULL COMMENT '이미지 경로',
  `cdatetime` datetime NOT NULL COMMENT '생성일',
  `udatetime` datetime DEFAULT NULL COMMENT '수정일',
  `dyn` varchar(4) NOT NULL DEFAULT 'N' COMMENT 'Y-삭제, N-미삭제',
  PRIMARY KEY (`imgid`),
  KEY `FKtkbtkc8wqtf0vh0se3wqja512` (`did`),
  CONSTRAINT `FKtkbtkc8wqtf0vh0se3wqja512` FOREIGN KEY (`did`) REFERENCES `drink` (`did`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=545 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dlike`
--

DROP TABLE IF EXISTS `dlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dlike` (
  `dlid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '찜 번호',
  `did` bigint(20) DEFAULT NULL COMMENT '술 번호',
  `uid` bigint(20) DEFAULT NULL COMMENT '회원 번호',
  PRIMARY KEY (`dlid`),
  KEY `FKdcjysmsul5tw2iedy17t0aotg` (`uid`),
  KEY `FKgu082kd5afdb2ob7ofawkh4ra` (`did`),
  CONSTRAINT `FKdcjysmsul5tw2iedy17t0aotg` FOREIGN KEY (`uid`) REFERENCES `members` (`uid`) ON DELETE CASCADE,
  CONSTRAINT `FKgu082kd5afdb2ob7ofawkh4ra` FOREIGN KEY (`did`) REFERENCES `drink` (`did`) ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `drink`
--

DROP TABLE IF EXISTS `drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drink` (
  `did` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '술 번호',
  `name` varchar(100) NOT NULL COMMENT '술 이름',
  `alc` double NOT NULL COMMENT '술 도수',
  `ingre` varchar(1000) DEFAULT NULL COMMENT '술 재료',
  `maker` varchar(300) NOT NULL COMMENT '술 제조사/회사/상호명',
  `address` varchar(500) NOT NULL COMMENT '생산지',
  `region` varchar(500) NOT NULL COMMENT '지역 구분/ ~~구까지',
  `price` bigint(20) DEFAULT '0' COMMENT '술 가격',
  `food` varchar(5000) DEFAULT NULL COMMENT '어울리는 안주',
  `info` varchar(6000) NOT NULL COMMENT '술 정보',
  `category` varchar(50) NOT NULL COMMENT '1-탁주/막걸리, 2-약주/청주, 3-증류주, 4-과실주',
  `sweet` int(11) NOT NULL DEFAULT '0' COMMENT '단맛',
  `sour` int(11) NOT NULL DEFAULT '0' COMMENT '신맛',
  `cool` int(11) NOT NULL DEFAULT '0' COMMENT '청량감',
  `body` int(11) NOT NULL DEFAULT '0' COMMENT '바디감',
  `balance` int(11) NOT NULL DEFAULT '0' COMMENT '밸런스',
  `insense` int(11) NOT NULL DEFAULT '0' COMMENT '향기',
  `throat` int(11) NOT NULL DEFAULT '0' COMMENT '목넘김',
  PRIMARY KEY (`did`),
  KEY `FK_drink_desclist` (`category`),
  CONSTRAINT `FK_drink_desclist` FOREIGN KEY (`category`) REFERENCES `desclist` (`dname`)
) ENGINE=InnoDB AUTO_INCREMENT=544 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `fid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '파일 번호',
  `bid` bigint(20) DEFAULT NULL COMMENT '게시글번호',
  `orgname` varchar(1000) NOT NULL COMMENT '파일 이름',
  `savename` varchar(1000) NOT NULL COMMENT '저장파일 이름',
  `path` varchar(1000) NOT NULL COMMENT '파일경로',
  `dyn` varchar(4) NOT NULL DEFAULT 'N' COMMENT 'Y-삭제, N-미삭제',
  PRIMARY KEY (`fid`),
  KEY `FK79nbx899gul75ggbiuq23hshk` (`bid`),
  CONSTRAINT `FK79nbx899gul75ggbiuq23hshk` FOREIGN KEY (`bid`) REFERENCES `board` (`bid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '회원 번호',
  `id` varchar(100) NOT NULL COMMENT '아이디',
  `password` varchar(100) NOT NULL COMMENT '비밀번호',
  `name` varchar(50) NOT NULL COMMENT '이름',
  `nick` varchar(50) NOT NULL COMMENT '닉네임,별명',
  `email` varchar(100) NOT NULL COMMENT '이메일',
  `gender` int(11) NOT NULL DEFAULT '3' COMMENT '성별 1-남자 2-여자 3-기타',
  `birth` datetime NOT NULL COMMENT '생년월일',
  `phone` varchar(100) NOT NULL COMMENT '휴대폰 번호',
  `address` varchar(200) DEFAULT NULL COMMENT '주소',
  `cdatetime` datetime NOT NULL COMMENT '생성일',
  `udatetime` datetime DEFAULT NULL COMMENT '수정일',
  `adminflag` int(11) NOT NULL DEFAULT '0' COMMENT '관리자 플래그 0-일반, 1- 관리자',
  `userflag` int(11) NOT NULL DEFAULT '0' COMMENT '회원 상태 플래그 0-정상, 1- 정지, 2-탈퇴',
  `provider` varchar(1000) DEFAULT NULL,
  `authority` enum('ROLE_ADMIN','ROLE_USER') DEFAULT NULL,
  `access_token` varchar(2000) DEFAULT NULL,
  `access_token_expire_in` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `UK_15l1eu64rim2shg1s0357e1wn` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `relike`
--

DROP TABLE IF EXISTS `relike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relike` (
  `rlid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '좋아요 고유ID',
  `cid` bigint(20) NOT NULL COMMENT '리뷰 고유 ID',
  `uid` bigint(20) NOT NULL COMMENT '유저 고유 ID',
  PRIMARY KEY (`rlid`),
  KEY `FK_relike_comments` (`cid`),
  KEY `FK_relike_members` (`uid`),
  CONSTRAINT `FK_relike_comments` FOREIGN KEY (`cid`) REFERENCES `comments` (`cid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_relike_members` FOREIGN KEY (`uid`) REFERENCES `members` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `rid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '리뷰 번호',
  `did` bigint(20) DEFAULT NULL COMMENT '술 번호',
  `uid` bigint(20) DEFAULT NULL COMMENT '회원 번호',
  `title` varchar(5000) NOT NULL COMMENT '리뷰 제목',
  `content` varchar(5000) NOT NULL COMMENT '리뷰 번호',
  `score` bigint(20) NOT NULL COMMENT '평점',
  `cdatetime` datetime NOT NULL COMMENT '생성일',
  `udatetime` datetime DEFAULT NULL COMMENT '수정일',
  `dyn` varchar(4) NOT NULL DEFAULT 'N' COMMENT 'Y-삭제, N-미삭제',
  PRIMARY KEY (`rid`),
  KEY `FK5cmpmso0y1ag2jp677tceh0ki` (`did`),
  KEY `FKcvc5qfrb65et2cfxox61mj1ft` (`uid`),
  CONSTRAINT `FK5cmpmso0y1ag2jp677tceh0ki` FOREIGN KEY (`did`) REFERENCES `drink` (`did`) ON DELETE CASCADE,
  CONSTRAINT `FKcvc5qfrb65et2cfxox61mj1ft` FOREIGN KEY (`uid`) REFERENCES `members` (`uid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rimg`
--

DROP TABLE IF EXISTS `rimg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rimg` (
  `imgid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '이미지 번호',
  `rid` bigint(20) DEFAULT NULL COMMENT '리뷰 번호',
  `iname` varchar(1000) NOT NULL COMMENT '파일이름',
  `path` varchar(1000) NOT NULL COMMENT '파일경로',
  `cdatetime` datetime NOT NULL COMMENT '생성일',
  `udatetime` datetime DEFAULT NULL COMMENT '수정일',
  `dyn` varchar(4) NOT NULL DEFAULT 'N' COMMENT 'Y-삭제 N-출력',
  PRIMARY KEY (`imgid`),
  KEY `FK61p5p5ksorjg7pj8n7qrg7ny2` (`rid`),
  CONSTRAINT `FK61p5p5ksorjg7pj8n7qrg7ny2` FOREIGN KEY (`rid`) REFERENCES `review` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-19 15:31:29
