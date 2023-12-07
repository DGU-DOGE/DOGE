package hello.hellospring.dataprocessing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class DataProcessingController {

    private List<CallNumberRange> ranges = new ArrayList<>();

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void RangeInsert(){
        this.ranges.add(new CallNumberRange("일반도서28", "지하2층", "010 굴813", "028 임53", "028 임53", "041 이73", 16));
        this.ranges.add(new CallNumberRange("일반도서29", "지하2층", "041 이77", "070.5 김72", "070.5 김77", "079.53 소239ㅈ", 16));
        this.ranges.add(new CallNumberRange("일반도서30", "지하2층", "400.1 K92n", "405 C548lf이", "405 C548lv", "410.7 박11ㅎ", 16));
        this.ranges.add(new CallNumberRange("일반도서31", "지하2층", "410.7 박14ㅎ", "411.4 리68ㅇ", "411.4 리68ㅇ", "415 김819ㅇ", 16));
        this.ranges.add(new CallNumberRange("일반도서32", "지하2층", "415 김832ㄱ", "417.0251 이51ㅈ", "417.0251 최211ㄱ", "419.076 금57ㅅ", 14));
        this.ranges.add(new CallNumberRange("일반도서33", "지하2층", "419.076 김11ㅅ육", "419.864 초239ㅈ", "419.864 최72ㅈ", "419.98 아53ㅎ", 16));
        this.ranges.add(new CallNumberRange("일반도서34", "지하2층", "419.98 안66ㅇ", "420.76 신225ㅎ", "420.76 신225m", "425 C737", 16));
        this.ranges.add(new CallNumberRange("일반도서35", "지하2층", "425 C941v", "428.34 강95ㅇ", "428.34 강95아", "499.992 Z24s최", 16));
        this.ranges.add(new CallNumberRange("일반도서36", "지하2층", "900 A698h", "900 B827", "909 B877", "910.4 이98o", 16));
        this.ranges.add(new CallNumberRange("일반도서37", "지하2층", "910.4 임18ㅇ", "915.1 도57ㅎ", "915.1 동17", "915.34 윤55", 16));
        this.ranges.add(new CallNumberRange("일반도서38", "지하2층", "915.34 이53", "920.051 원813", "920.051 위222태", "923.144 W866", 14));
        this.ranges.add(new CallNumberRange("일반도서39", "지하2층", "923.147 정91ㄹ", "923.511 윤67", "923.511 윤73ㅁ", "929.20873 P361", 16));
        this.ranges.add(new CallNumberRange("일반도서40", "지하2층", "929.251 강238", "940.1 이67ㅍ", "940.1 지51ㄷ남", "943.085 백14", 16));
        this.ranges.add(new CallNumberRange("일반도서41", "지하2층", "943.085 이815", "950 동47", "950 동47", "951 김75", 16));
        this.ranges.add(new CallNumberRange("일반도서42", "지하2층", "951 김75", "951 한17", "951 한17", "951.004 이53ㅁ c.3", 16));
        this.ranges.add(new CallNumberRange("일반도서43", "지하2층", "951.004 이53아", "951.0082 한17", "951.0082 한17", "951.023 왕42ㄴ오", 16));
        this.ranges.add(new CallNumberRange("일반도서44", "지하2층", "951.024 이53ㅁ", "951.033 전815ㄱ", "951.033 정225ㄷ", "951.04 신64ㅊ", 14));
        this.ranges.add(new CallNumberRange("일반도서45", "지하2층", "951.04 신68ㄱ", "951.05 사96", "951.05 사96", "951.052 성75", 16));
        this.ranges.add(new CallNumberRange("일반도서46", "지하2층", "951.052 성75", "951.057 오64자", "951.057 오64조", "951.059 신73", 16));
        this.ranges.add(new CallNumberRange("일반도서47", "지하2층", "951.059 신77", "951.06 안53ㄱ", "951.06 안75", "951.063 국51", 16));
        this.ranges.add(new CallNumberRange("일반도서48", "지하2층", "951.063 국51하", "951.07 건17", "951.07 건17ㅇ", "951.0723 국41", 16));
        this.ranges.add(new CallNumberRange("일반도서49", "지하2층", "951.0723 국41", "951.2 서222", "951.2 서222", "951.6 서67", 16));
        this.ranges.add(new CallNumberRange("일반도서50", "지하2층", "951.6 서67", "951.84 영211", "951.84 영211", "951.99 대73", 14));
        this.ranges.add(new CallNumberRange("일반도서51", "지하2층", "951.99 문64", "952 진37ㅇ", "952 진45ㅈ", "952.008 사813", 16));
        this.ranges.add(new CallNumberRange("일반도서52", "지하2층", "952.008 사813", "952.02 서77", "952.02 소211", "952.05 신17", 16));
        this.ranges.add(new CallNumberRange("일반도서53", "지하2층", "952.05 심67", "952.068 손37", "952.068 손71", "952.5 김91", 16));
        this.ranges.add(new CallNumberRange("일반도서54", "지하2층", "952.5 김98", "953.0019 실45", "953.0019 십53", "953.072 송73", 16));
        this.ranges.add(new CallNumberRange("일반도서55", "지하2층", "953.072 승51", "959.7 유69", "959.7 유73", "999 박44ㄴ", 16));
        this.ranges.add(new CallNumberRange("일반도서1", "지하2층", "800 김16", "808.06 박75", "808.06 배75", "808.4 김64", 16));
        this.ranges.add(new CallNumberRange("일반도서2", "지하2층", "808.4 김51", "809.2 하92", "809.2 한17", "810.81 조79", 16));
        this.ranges.add(new CallNumberRange("일반도서3", "지하2층", "810.81 조79", "810.82 오53", "810.82 오53", "810.9 이63", 16));
        this.ranges.add(new CallNumberRange("일반도서4", "지하2층", "810.9 이64", "810.906 김67", "810.906 김67", "811.09 김811", 16));
        this.ranges.add(new CallNumberRange("일반도서5", "지하2층", "811.09 김811", "811.3 C548", "811.307 김223", "811.6 김58", 14));
        this.ranges.add(new CallNumberRange("일반도서6", "지하2층", "811.6 김59", "811.6 위53", "811.6 유11", "811.6 한67", 16));
        this.ranges.add(new CallNumberRange("일반도서7", "지하2층", "811.6 한68", "811.609 박35ㅁ", "811.609 박35마", "811.909 변75", 16));
        this.ranges.add(new CallNumberRange("일반도서8", "지하2층", "811.909 서13", "813.09 최811", "813.09 최94", "813.5809 김96", 16));
        this.ranges.add(new CallNumberRange("일반도서9", "지하2층", "813.5809 두811", "813.6 김53", "813.6 김53", "813.6 김91", 16));
        this.ranges.add(new CallNumberRange("일반도서10", "지하2층", "813.6 김91ㅇ", "813.6 박73", "813.6 박73", "813.6 안71", 16));
        this.ranges.add(new CallNumberRange("일반도서11", "지하2층", "813.6 안71ㅅ", "813.6 은98", "813.6 은98", "813.6 이67", 14));
        this.ranges.add(new CallNumberRange("일반도서12", "지하2층", "813.6 이67", "813.6 장66ㅅ", "813.6 장66ㅇ", "813.6 주57부", 16));
        this.ranges.add(new CallNumberRange("일반도서13", "지하2층", "813.6 주57", "813.6 현75", "813.6 현79ㅁ", "813.6082 문91저", 16));
        this.ranges.add(new CallNumberRange("일반도서14", "지하2층", "813.6082 문91저", "813.609 이37", "813.609 이39ㄱ", "814.6 김811", 16));
        this.ranges.add(new CallNumberRange("일반도서15", "지하2층", "814.6 김812", "814.6 재64", "814.6 전14ㄱ", "816.6 강67ㄹ", 16));
        this.ranges.add(new CallNumberRange("일반도서16", "지하2층", "816.6 강67", "818.08 서67ㅅ", "818.08 한17", "818.6 희31", 16));
        this.ranges.add(new CallNumberRange("일반도서17", "지하2층", "818.6 혜39ㅈ c.3", "819.09 요44ㅎ", "819.09 요64ㅇ이", "819.1309 유53당", 14));
        this.ranges.add(new CallNumberRange("일반도서18", "지하2층", "819.1309 유53ㅈ", "819.35 진19ㅈ", "819.35 진39ㅊ덕 v.1", "819.908 일45유 v.1 c.2", 16));
        this.ranges.add(new CallNumberRange("일반도서19", "지하2층", "819.908 일45유", "819.935 교73", "819.935 구17", "819.935 앵73", 16));
        this.ranges.add(new CallNumberRange("일반도서20", "지하2층", "819.935 야11ㅅ", "819.94 복73ㅅ고", "819.945 오35", "820.9 P366", 16));
        this.ranges.add(new CallNumberRange("일반도서21", "지하2층", "820.9 P485", "821.09 N433", "821.09 N825", "822.33 S527", 16));
        this.ranges.add(new CallNumberRange("일반도서22", "지하2층", "822.33 S527", "823 C319", "823 C319", "823 G248", 16));
        this.ranges.add(new CallNumberRange("일반도서23", "지하2층", "823 G248cr", "823 K52s조", "823 K54s조", "823 P211i정", 14));
        this.ranges.add(new CallNumberRange("일반도서24", "지하2층", "823 P211i정", "823 T649h이ㄱ", "823 T649h이ㄱ2", "823.09 Jj89f김ㅇ", 16));
        this.ranges.add(new CallNumberRange("일반도서25", "지하2층", "823.09 J89j박", "830.9 지34ㄷ", "830.9 지34ㄷ2", "833 H587w안", 16));
        this.ranges.add(new CallNumberRange("일반도서26", "지하2층", "833 H618s김", "842 T344j성", "842 T789b이", "843 V752e고", 16));
        this.ranges.add(new CallNumberRange("일반도서27", "지하2층", "843 V857d림", "882 A253g곽2", "882 A253ha김", "899.9693 S193m김", 16));
        this.ranges.add(new CallNumberRange("일반도서1", "지하1층", "300 견79ㅅ", "300.76 이66ㅇ5 v.3", "301.0953 이59ㅎ", "300.76 홍 64ㅅ", 16));
        this.ranges.add(new CallNumberRange("일반도서2", "지하1층", "300.8 김75ㅅ c.2", "301 T641o", "301 T727r조", "301.0953 유73ㄱ", 12));
        this.ranges.add(new CallNumberRange("일반도서3", "지하1층", "301.36 H758c", "302.2 홍53ㅍ c.3", "303.34 허77ㅇ", "302.545 B985d김", 16));
        this.ranges.add(new CallNumberRange("일반도서4", "지하1층", "303 H278t6강", "302.23076 예91마 c.2", "302.23076 예91매", "303.4833 이34ㅅ", 12));
        this.ranges.add(new CallNumberRange("일반도서5", "지하1층", "303.4833 이34ㅅ", "304 궁51ㄹ", "305.4094 지51ㅁ김", "304.6021 구71ㅇ", 16));
        this.ranges.add(new CallNumberRange("일반도서6", "지하1층", "304.609512 김227ㅂ", "304.6021 구71ㅇ", "305.244 탁53ㄷ", "305.40994 S955m", 12));
        this.ranges.add(new CallNumberRange("일반도서7", "지하1층", "305.42 A133w", "306.01 B483a", "306.20952 진45ㅈ c.2", "306.09498 한51ㅎ", 14));
        this.ranges.add(new CallNumberRange("일반도서8", "지하1층", "306.095 H233c", "306.0952 공45ㅈ c.3", "306.0952 관53ㅁ", "306.209512 S947o", 8));
        this.ranges.add(new CallNumberRange("일반도서9", "지하1층", "306.209512 전64ㅂ", "306.81 C466f", "309.2 P278s", "307.774 신79ㅁ", 16));
        this.ranges.add(new CallNumberRange("일반도서10", "지하1층", "308 세14학 v.1", "307.12 A358r", "307.12 A439p안", "320.04 백14ㅎ c.2", 12));
        this.ranges.add(new CallNumberRange("일반도서11", "지하1층", "320.04 법79ㄴ", "320.4 천73ㅈ c.3", "320.947 S158r4", "320.54 흥51ㄴ", 16));
        this.ranges.add(new CallNumberRange("일반도서12", "지하1층", "320.5401 D273t", "320.54 M478k", "320.54 M478m", "320.951 윤813하 c.2", 12));
        this.ranges.add(new CallNumberRange("일반도서13", "지하1층", "320.951 윤94ㅎ", "320.952 월79ㅈ", "321.86 임812ㄱ", "321.86 이19ㄱ c.2", 16));
        this.ranges.add(new CallNumberRange("일반도서14", "지하1층", "321.86 임812ㅅ", "321.07 P718LS", "321.07 P718p", "323.445 M135L2", 12));
        this.ranges.add(new CallNumberRange("일반도서15", "지하1층", "323.445 M135LS", "324.973 S568g", "327.2 국239ㅎ v.10", "327 황66ㄱ", 16));
        this.ranges.add(new CallNumberRange("일반도서16", "지하1층", "327.01 D433i", "327 임94ㅅ c.2", "327 입11ㅎ3", "327.51053 장221ㅈ", 12));
        this.ranges.add(new CallNumberRange("일반도서17", "지하1층", "327.51053 장41ㅁ", "328 김67ㅇ c.2", "330.015193 T315a", "330 i64L정", 16));
        this.ranges.add(new CallNumberRange("일반도서18", "지하1층", "330 가45ㄱ", "330 캠843ㄱ", "330 토41ㄱ", "330.1 김51ㅅ c.2", 12));
        this.ranges.add(new CallNumberRange("일반도서19", "지하1층", "330.1 김51ㅎ", "330.1 W637f이 c.2", "330.156 원73", "330.63 김239ㄱ", 14));
        this.ranges.add(new CallNumberRange("일반도서20", "지하1층", "330.65 삼53ㅅ10", "330.122 S526c", "330.112 S533n", "330.9 국73ㅇ c.4", 8));
        this.ranges.add(new CallNumberRange("일반도서21", "지하1층", "330.9 궁19ㅅ", "330.951 경73가 v.98", "330.952 유17ㅍ황", "330.952 유17ㅈ김", 16));
        this.ranges.add(new CallNumberRange("일반도서22", "지하1층", "330.952 유17ㅍ황", "330.951 전66가 v.2", "330.951 전66ㅎ", "331 조51k", 12));
        this.ranges.add(new CallNumberRange("일반도서23", "지하1층", "331 조67ㄴ", "331.252 노225ㅌ c.2", "332 C187i5", "332 B974p c.2", 16));
        this.ranges.add(new CallNumberRange("일반도서24", "지하1층", "332 C187i2", "331.8 R845ㅇ", "331.8 W824m", "332.042 C891g", 12));
        this.ranges.add(new CallNumberRange("일반도서25", "지하1층", "332.042 D229f", "332.4 김59ㅌ c.3", "332.63 C782r", "332.54 일45ㄷ", 16));
        this.ranges.add(new CallNumberRange("일반도서26", "지하1층", "332.6 A216e투", "332.6 대91즈", "332.6 동14ㅈ", "332.6324 김91부2", 12));
        this.ranges.add(new CallNumberRange("일반도서27", "지하1층", "332.6324 김91ㅅ", "332.6730952 C112d서", "333.760284 D136k", "333.7 흑61ㅈ", 16));
        this.ranges.add(new CallNumberRange("일반도서28", "지하1층", "333.701 G629m", "333.33 조69ㅂ2012", "333.33 조77ㅂ", "335.4092 M392ㅍ적", 12));
        this.ranges.add(new CallNumberRange("일반도서29", "지하1층", "335.4092 M392kA이", "336.2 이44ㄷ2011", "338 L665b", "337.95 남223ㄷ", 16));
        this.ranges.add(new CallNumberRange("일반도서30", "지하1층", "338 A213i홍", "336.276 장227ㅅ", "336.276 좌76ㅅ", "338.18492 민64ㅈ c.2", 12));
        this.ranges.add(new CallNumberRange("일반도서31", "지하1층", "338.1851 강811ㅎ", "338.4768121109 C577c최", "338.544 매69사", "338.5 황75ㅁ3 c.4", 14));
        this.ranges.add(new CallNumberRange("일반도서32", "지하1층", "338.501 E29e장", "338.5 이64ㅁ3 c.5", "338.5 이64ㅁ3 c.6", "338.768536092 K71sa안", 8));
        this.ranges.add(new CallNumberRange("일반도서33", "지하1층", "338.768551 유96ㅅ", "338.951 경73ㅅ c.2", "350.285 안37ㅈ5", "344.9773 S243m", 16));
        this.ranges.add(new CallNumberRange("일반도서34", "지하1층", "345 B255c", "339.2 이72ㄱ c.2", "339.2 이73ㅅ", "351.13 박72ㅇ c.3", 12));
        this.ranges.add(new CallNumberRange("일반도서35", "지하1층", "351.13 삼73ㅎ c.3", "352.14 서19ㅎ c.2", "353.41 서67ㅅ", "352.96 김45ㄱ", 16));
        this.ranges.add(new CallNumberRange("일반도서36", "지하1층", "353 G284a", "352.35 감51거 2014", "352.35 감51거2015", "355.033051 김45ㅂ", 12));
        this.ranges.add(new CallNumberRange("일반도서37", "지하1층", "355.033051 김53ㅊ", "356.10951 한17ㄷ c.2", "361.32 김14ㅅ", "361.0951 전17ㅅ", 16));
        this.ranges.add(new CallNumberRange("일반도서38", "지하1층", "361.1 A376c", "360.9512 이813ㅂ c.3", "360.9516 서67 v.1997", "361.951 이72ㅅ c.3", 12));
        this.ranges.add(new CallNumberRange("일반도서39", "지하1층", "361.951 이75ㅅ", "362.4082 장62ㅈ", "363.11 강255ㄱ", "362.782 경811ㅁ", 16));
        this.ranges.add(new CallNumberRange("일반도서40", "지하1층", "362.8 C674c", "362.7 주73ㅇ2", "362.7 주73아", "363.25923 G293p3", 12));
        this.ranges.add(new CallNumberRange("일반도서41", "지하1층", "363.25923 G293p4", "363.7 최64ㅇ c.2", "364.133 관53ㅁ2002", "364 황53ㅅ", 16));
        this.ranges.add(new CallNumberRange("일반도서42", "지하1층", "364.01 B336c", "363.9 T629p", "363.9095 김43ㄷ", "364.6 M647d", 12));
        this.ranges.add(new CallNumberRange("일반도서43", "지하1층", "364.6 M963i", "368.1076 김811ㅅ", "370.1 김813ㅁ", "370 황73ㄱ2", 14));
        this.ranges.add(new CallNumberRange("일반도서44", "지하1층", "370.061 포813ㅍ", "369.43 한17ㅅ20", "369.43 한17ㅎ", "370.117 박811ㅇ", 8));
        this.ranges.add(new CallNumberRange("일반도서45", "지하1층", "370.117 박813ㄷ", "370.76 고234ㅊ c.2", "370.95183 허73ㅎ", "370.951 비61ㅂ", 16));
        this.ranges.add(new CallNumberRange("일반도서46", "지하1층", "370.951 사96ㅎ", "370.92 이17ㅇ", "370.92 이37ㅎ", "371.2021 주51ㄱ c.2", 12));
        this.ranges.add(new CallNumberRange("일반도서47", "지하1층", "371.2021 주51ㅁ", "371.334 전64ㅇ c.2", "372. 박53아", "371.9853 박51ㅂ", 16));
        this.ranges.add(new CallNumberRange("일반도서48", "지하1층", "372 B512s홍", "371.9 국239자", "371.9 국239ㅌ2008", "372.973 D411L", 12));
        this.ranges.add(new CallNumberRange("일반도서49", "지하1층", "373 길73ㅈ", "375.628 서68ㅎ", "379 장223ㄱ", "378.489 S938c", 16));
        this.ranges.add(new CallNumberRange("일반도서50", "지하1층", "378.5 U56h", "378.3 해66 c.3", "378.3 N2774", "382 박75ㅁ3", 12));
        this.ranges.add(new CallNumberRange("일반도서51", "지하1층", "382 박75무2", "382.06 세14w25", "384.041 콘833ㄷ조", "384 홍53ㄱ", 16));
        this.ranges.add(new CallNumberRange("일반도서52", "지하1층", "384.004 김47ㅈ", "382.6 산45ㅊ c.2", "382.6 삼215ㅅ", "385.0951 철225ㅎ100", 12));
        this.ranges.add(new CallNumberRange("일반도서53", "지하1층", "385.0951 최97ㅊ", "390.09514 김68ㄱ c.2", "394.15 최53서", "391.9567 S954b", 16));
        this.ranges.add(new CallNumberRange("일반도서54", "지하1층", "392 B774s성", "391.0951 조96ㅎ c.3", "391.0952 성19ㅈ", "396.9 이96ㅎ v.3 c.2", 12));
        this.ranges.add(new CallNumberRange("일반도서55", "지하1층", "396.9 B387w", "398.2 B933s유2 c.2", "398.20953 길73ㅇ양", "398.3699775 B331f", 14));
        this.ranges.add(new CallNumberRange("일반도서56", "지하1층", "398.4 B732L남", "398.20951 윤94ㅎ c.2", "398.20951 이14ㅁ", "398.9924 G561j", 4));
        this.ranges.add(new CallNumberRange("일반도서57", "지하1층", "650 김51ㅊ", "650.1 장73ㅅ", "650.1 장73ㅇ", "650.13 굴16ㅇ윤 c.2", 16));
        this.ranges.add(new CallNumberRange("일반도서58", "지하1층", "650.13 권69ㄷ", "651.74 W552h", "651.74 W686w", "657 반53ㅎ2", 14));
        this.ranges.add(new CallNumberRange("일반도서59", "지하1층", "657 반53ㅎ2부", "657 L345f21", "657 L533a", "657.076 월11ㄱ10", 16));
        this.ranges.add(new CallNumberRange("일반도서60", "지하1층", "657.076 월11ㄱ11", "657.4076 권66ㅇ2", "657.4076 권66ㅇ2 c.2", "657.48 송69재5", 16));
        this.ranges.add(new CallNumberRange("일반도서61", "지하1층", "657.48 송69재6", "657.834 조53ㄱ5 c.2", "657.834 B496p", "658 이832겨 c.2", 16));
        this.ranges.add(new CallNumberRange("일반도서62", "지하1층", "658 이832겨2", "658.001 송17ㅎ c.3", "658.001 신17ㄱ", "658.023 이812삼", 16));
        this.ranges.add(new CallNumberRange("일반도서63", "지하1층", "658.023 장58ㅈ", "658.082 한17ㅎ v.18 c.2", "658.082 한17하 v.1", "658.11 T584n6주", 16));
        this.ranges.add(new CallNumberRange("일반도서64", "지하1층", "658.11 T584n6주ㅇ", "658.151 G161f국 c.3", "658.15 G242m3", "658.1554 B995i이 c.3", 14));
        this.ranges.add(new CallNumberRange("일반도서65", "지하1층", "658.1554 D619i", "658.3 정91ㅅ2 c.3", "658.3 정91ㅇ", "658.31125 취63기", 16));
        this.ranges.add(new CallNumberRange("일반도서66", "지하1층", "658.31125 취63ㄴ", "658.4 수65ㅅ박", "658.4 수65ㅊ이", "658.4012 남64ㅅ", 16));
        this.ranges.add(new CallNumberRange("일반도서67", "지하1층", "658.4012 남64ㅈ", "658.4032 김17ㅍ c.3", "658.4032 김75ㅅ v.1", "658.4038011 최233ㄷ c.3", 16));
        this.ranges.add(new CallNumberRange("일반도서68", "지하1층", "658.4038011 한17ㄱ", "658.409 도53ㄱ김 c.2", "658.409 동37ㄷ", "658.421 대62ㄷ김 c.2", 16));
        this.ranges.add(new CallNumberRange("일반도서69", "지하1층", "658.421 박67ㅎ", "658.5 S183h3", "658.5 S237i", "658.7 영35ㄱ박", 16));
        this.ranges.add(new CallNumberRange("일반도서70", "지하1층", "658.7 영35ㅁ황", "658.8 여67ㅁ c.5", "658.8 여57마", "658.8 S364m5", 14));
        this.ranges.add(new CallNumberRange("일반도서71", "지하1층", "658.8 S374l", "658.82 석75ㅈ", "658.82 수17ㅍ문", "658.8342 박34소 c.3", 12));
        this.ranges.add(new CallNumberRange("일반도서72", "지하1층", "658.8342 박44ㅌ", "658.840285 산63e v.2004 c.2", "658.840285 서19e", "658.87 설45ㅇ c.2", 10));
        this.ranges.add(new CallNumberRange("일반도서73", "지하1층", "658.87 성52ㅇ강", "658.924 이42ㄱ c.3", "658.924 임44ㄱ v.1", "659.1 W731d박ㅋ", 8));
        this.ranges.add(new CallNumberRange("일반도서74", "지하1층", "659.1 W731d조", "659.14 한17고 2011(13)", "659.14 한17고 2011(14)", "659.512 G932c구 c.3", 6));
        this.ranges.add(new CallNumberRange("철학일반도서1", "1층", "100 강53ㄱ", "131.3462 F889s열", "131.3462 F889s열", "152.1 S681t서", 32));
        this.ranges.add(new CallNumberRange("철학일반도서2", "1층", "152.1 Y24s2곽", "158 P464c전", "158 P464c전", "170 도53ㅇ", 32));
        this.ranges.add(new CallNumberRange("철학일반도서3", "1층", "170 문53ㅎ", "179 B694sB", "179 C222c공", "181.123 최819ㅊ장", 24));
        this.ranges.add(new CallNumberRange("철학일반도서4", "1층", "181.123 최819ㅊ장", "181.213 홍53ㅅ", "181.213 홍53ㅅ", "181.272 윤72ㄴ", 32));
        this.ranges.add(new CallNumberRange("철학일반도서5", "1층", "181.272 윤72ㄴ나", "193 고44ㅇ", "193 관53ㅌ김", "200.1 W664m조", 32));
        this.ranges.add(new CallNumberRange("불교일반도서1", "1층", "200.1 W664m조", "210.16 주57ㅂ", "210.16 중53ㅈ", "210.82 대69", 32));
        this.ranges.add(new CallNumberRange("불교일반도서2", "1층", "210.82 대69", "210.953 상813ㅍ", "210.953 규59가", "212 S392hW", 32));
        this.ranges.add(new CallNumberRange("불교일반도서3", "1층", "212 W484t", "213.12 A861bBK", "213.12 A861bS", "213.15 원67ㄴ", 32));
        this.ranges.add(new CallNumberRange("불교일반도서4", "1층", "213.15 원69ㅎ", "213.2 목73ㄱ", "213.2 목73계", "214.2 무212ㅁ2", 24));
        this.ranges.add(new CallNumberRange("불교일반도서5", "1층", "214.2 무34ㅍ박", "216.153 이228ㅇ", "216.153 이228우", "218.082 한17ㄷ", 32));
        this.ranges.add(new CallNumberRange("불교일반도서6", "1층", "218.082 한17ㄷ", "218.43 성73ㅈ", "218.43 성813ㅅ", "218.8 혜59ㅅ종", 32));
        this.ranges.add(new CallNumberRange("불교일반도서7", "1층", "218.8 혜59ㅇ한", "219.7 조17ㅇ2", "219.7 조221", "219.808 정835ㅈ", 32));
        this.ranges.add(new CallNumberRange("기타종교1", "1층", "219.808 정835ㅈ", "292.08 강68ㅁ", "292.08 B959gR", "299.94 A237d2", 32));
        this.ranges.add(new CallNumberRange("예술체육일반도서1", "1층", "700 도19ㄷ김 c.4", "709.51 이832ㅈ v.1 c.2", "709.51 이832ㅎ", "720.951 대91한", 32));
        this.ranges.add(new CallNumberRange("예술체육일반도서2", "1층", "720.951 도96ㅂ", "738.0951 경19ㄱ", "738.0951 공77ㄱ", "759 R995s박 c.2", 24));
        this.ranges.add(new CallNumberRange("예술체육일반도서3", "1층", "759 S935u권 c.2", "780.951 노225ㅊ c.3", "780.951 노225하", "791.430951 유79하", 32));
        this.ranges.add(new CallNumberRange("예술체육일반도서4", "1층", "791.430951 유79하 c.2", "792.95 S527sBu", "792.95 S527shaW", "799.320951 정79ㅎ", 32));
        this.ranges.add(new CallNumberRange("일반도서1", "3층", "001 C136h박", "004.36 삼62", "004.36 삼67", "005.1 V217", 24));
        this.ranges.add(new CallNumberRange("일반도서2", "3층", "005.1 V334", "005.133 M585", "005.133 M594", "005.4469 우72", 32));
        this.ranges.add(new CallNumberRange("일반도서3", "3층", "005.4469 우72", "005.8 P667", "005.8 P746", "006.8 한17ㅁ", 32));
        this.ranges.add(new CallNumberRange("일반도서4", "3층", "501 O29s", "510.2 소225", "510.2 소225", "515.3 김95", 32));
        this.ranges.add(new CallNumberRange("일반도서5", "3층", "515.3 김95", "519.5 소225", "519.5 소67", "520 K18", 28));
        this.ranges.add(new CallNumberRange("일반도서6", "3층", "520 K18", "530.143 V445", "530.1433 G884", "540 D235", 28));
        this.ranges.add(new CallNumberRange("일반도서7", "3층", "540 E38", "547.05 G454", "547.05 H149", "569.986 W939k양", 24));
        this.ranges.add(new CallNumberRange("일반도서8", "3층", "600 B255f정", "610.954 M597h", "610.954 M597h", "613.2 한64ㅂ", 28));
        this.ranges.add(new CallNumberRange("일반도서9", "3층", "613.2 한64", "615.85156 C236", "615.85156 C294", "616.85506 S561", 24));
        this.ranges.add(new CallNumberRange("일반도서10", "3층", "616.855072 M522", "618.1 윤73", "618.1 이44", "620.1 P771", 24));
        this.ranges.add(new CallNumberRange("일반도서11", "3층", "620.1 p829", "620.80289 추44", "620.82 강53", "621.319 문34", 24));
        this.ranges.add(new CallNumberRange("일반도서12", "3층", "621.319 백16", "621.3815 이98", "621.3815 일45", "621.3821 남51", 24));
        this.ranges.add(new CallNumberRange("일반도서13", "3층", "621.3821 박44", "621.38456 이69", "621.38456 이72", "621.4022 C395", 16));
        this.ranges.add(new CallNumberRange("일반도서14", "3층", "621.4022 C395", "624.028 안53", "624.028 우75", "624.182 한17", 20));
        this.ranges.add(new CallNumberRange("일반도서15", "3층", "624.182 한17", "628 장97", "628 전37", "629.13254 이11", 16));
        this.ranges.add(new CallNumberRange("일반도서16", "3층", "629.1326 셈", "629.89 조813", "6293.89 주225", "641.5 남51", 16));
        this.ranges.add(new CallNumberRange("일반도서17", "3층", "641.5 노98", "646.3 이57", "646.3019 임57", "649.8 S738h6", 12));
        this.ranges.add(new CallNumberRange("일반도서18", "3층", "660 A261e2", "660.281 R756", "660.281 S572", "664 하221", 12));
        this.ranges.add(new CallNumberRange("일반도서19", "3층", "664 한34", "668.1 H925", "668.1 J81", "670.285 손53", 8));
        this.ranges.add(new CallNumberRange("일반도서20", "3층", "670.285 손94", "677.00952 김79", "677.022 송96", "690.0285 김69", 8));
        this.ranges.add(new CallNumberRange("일반도서21", "3층", "690.0285 김69", "690.8068 G851", "690.82 B932", "692.1 종91", 4));
        this.ranges.add(new CallNumberRange("일반도서22", "3층", "692.1 차51", "693.832 S798", "693.834 강53", "698.6 최225ㄷ2", 4));
    }

    private void sqlQuery(String sql) {
        try {
            jdbcTemplate.execute(sql);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
    }

    private int sqlObjectQuery(String sql) {
        int result = 0;
        try {
            result = jdbcTemplate.queryForObject(sql, Integer.class);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return result;
    }

    private int[] equalDivision(int total, int groups){
        int baseAmount, remainder;
        int[] amounts = new int[groups];
        baseAmount = total / groups;
        remainder = total % groups;

        for (int i = 0; i < groups; i++){
            amounts[i] = baseAmount + (i < remainder ? 1 : 0);
        }

        return amounts;
    }

    private void shelfInfoUpdate(String sqlHead, int[] amounts, int book_ID, int groups){
        String sql;
        for (int j = 1; j <= groups; j++) {
            int temp = amounts[j-1] + book_ID - 1;
            sql = sqlHead + j + " WHERE BOOK_ID >= " + book_ID + " AND BOOK_ID <= " + temp + ";";
            sqlQuery(sql);
            book_ID = temp + 1;
        }
    }

    private void insertFloorSHELF() {   // 책마다 층, 책장 정보 삽입
        String update;
        for (CallNumberRange range : ranges){
            if (range.getFloor().equals("지하1층")){
                update = "UPDATE BOOK SET FLOOR = '" + range.getFloor() + "', SHELF_NAME = '" + range.getShelfName() +
                        "' WHERE CALL_NUMBER >= '" + range.getStart() + "' AND CALL_NUMBER <= '" + range.getEnd() + "';";
                sqlQuery(update);
            }
        }
    }

    private void calShelfCount() {  // 균등분할로 Shelf_Count 계산
        String select, update;
        int total = 0, groups, book_ID;
        int[] amounts;
        int cnt = 1;
        for (CallNumberRange range : ranges){
            System.out.println(cnt++);
            select = "select count(*) from BOOK WHERE FLOOR = '" + range.getFloor() + "' AND SHELF_NAME = '" + range.getShelfName() + "';";

            total = sqlObjectQuery(select);
            groups = range.getCount();

            amounts = equalDivision(total, groups);

            select = "SELECT BOOK_ID FROM BOOK WHERE FLOOR = '" + range.getFloor() + "' AND SHELF_NAME = '" + range.getShelfName() + "' ORDER BY BOOK_ID OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY;";
            book_ID = sqlObjectQuery(select);

            update = "UPDATE BOOK SET SHELF_COUNT = ";
            shelfInfoUpdate(update, amounts, book_ID, groups);
        }
    }

    private void calRow() { // 균등분할로 Book_Row 계산
        String select, update;
        int total = 0, groups, book_ID;
        int[] amounts;
        int cnt = 1;
        for (CallNumberRange range : ranges){
            System.out.println(cnt++);

            for (int j = 1; j <= range.getCount(); j++) {
                select = "select count(*) from BOOK WHERE FLOOR = '" + range.getFloor() + "' AND SHELF_NAME = '" + range.getShelfName() + "' AND SHELF_COUNT = " + j + ";";

                total = sqlObjectQuery(select);
                groups = 7;

                amounts = equalDivision(total, groups);

                select = "SELECT BOOK_ID FROM BOOK WHERE FLOOR = '" + range.getFloor() + "' AND SHELF_NAME = '" + range.getShelfName() + "' AND SHELF_COUNT = " + j + " ORDER BY BOOK_ID OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY;";
                book_ID = sqlObjectQuery(select);

                update = "UPDATE BOOK SET BOOK_ROW = ";
                shelfInfoUpdate(update, amounts, book_ID, groups);
            }
        }
    }

    private void calCell() {    // Book_Cell 계산
        String query = "SELECT BOOK_ID, BOOK_ROW FROM BOOK WHERE BOOK_ROW != 0 ORDER BY BOOK_ID";

        jdbcTemplate.query(query, new ResultSetExtractor<Void>() {
            public Void extractData(ResultSet rs) throws SQLException {
                int prevBookRow = -1; // 초기값을 -1 또는 다른 비실제 값으로 설정
                int bookCellCounter = 1;

                while (rs.next()) {
                    int currentBookRow = rs.getInt("BOOK_ROW");
                    int bookId = rs.getInt("BOOK_ID");

                    if (currentBookRow != prevBookRow) {
                        bookCellCounter = 1; // 새로운 BOOK_ROW가 시작될 때 카운터 초기화
                    }

                    // BOOK_CELL 업데이트
                    jdbcTemplate.update("UPDATE BOOK SET BOOK_CELL = ? WHERE BOOK_ID = ?", bookCellCounter, bookId);

                    prevBookRow = currentBookRow; // 현재 BOOK_ROW 저장
                    bookCellCounter++; // 카운터 증가
                }
                return null;
            }
        });
    }

    @GetMapping("data")
    public String dataProcessing() {
        RangeInsert();

        insertFloorSHELF();;
        System.out.println("Floor, Shelf 정보 삽입 완료");
        calShelfCount();
        System.out.println("ShelfCount 계산 완료");
        calRow();
        System.out.println("Row 계산 완료");
        calCell();
        System.out.println("Cell 계산 완료");

        return "Data Processing 완료";
    }
}
