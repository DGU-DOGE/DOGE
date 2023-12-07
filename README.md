<div><img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFA500,100:FF8C00&height=200&section=header&text=DOGE&fontSize=90" /></div>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FDGU-DOGE%2FDOGE%2Fblob%2Fmain%2FREADME.md&count_bg=%23EF9E03&title_bg=%230B0000&icon=googlemaps.svg&icon_color=%23E58309&title=%EB%8F%99%EA%B5%AD%EB%8C%80%ED%95%99%EA%B5%90+%EB%8F%84%EC%84%9C%EA%B4%80+%EC%A7%80%EB%8F%84+DOGE&edge_flat=false)](https://hits.seeyoufarm.com)


# [2023년 2학기] 소프트웨어공학개론 DOGE

# 🙌 팀원 소개
## [Front-End]
| 이름                                         | 전공           | 학번   | Email                |
| -------------------------------------------- | -------------- | ------ | -------------------- |
| [김태윤](https://github.com/Cllaude99)       | 컴퓨터공학전공 | 19학번 | xodbsrla1025@naver.com
| [이민수](https://github.com/nanaoko705) |   컴퓨터공학전공  | 17학번 | penpenguin2018@gmail.com  |

## [Back-End]

| 이름                                      | 전공           | 학번   | Email               |
| ----------------------------------------- | -------------- | ------ | ------------------- |
| [손기민](https://github.com/KiminSon)      | 컴퓨터공학전공       | 19학번 |   kimin0331@naver.com  |
| [이형준](https://github.com/01HyungJun)     | 컴퓨터공학전공 | 19학번 | asd56780@naver.com  |

---

# ⚒️ Tech
<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=Recoil&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>
  <img src="https://img.shields.io/badge/Springboot-6DB33F?style=flat-square&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"/>  
</div>

![badges](https://img.shields.io/badge/IDE-VSCode-informational)
![badges](https://img.shields.io/badge/axios-1.6.0-red)
![badges](https://img.shields.io/badge/npm-8.5.0-green)

## 1. 프로젝트명
> 동국대학교 중앙 도서관 지도 - **DOGE** </br>
<img src="https://github.com/DGU-DOGE/DOGE/assets/96279437/83c327c9-4055-49bb-b295-354cd7070ddf" width="500"/>

## 2. 프로젝트 배경
>도서관에서 원하는 서적을 찾기 위해 서가 사이에서 한참을 뒤적거린 경험이 한 번쯤 있을 것이다. 도서관의
자료는 모두 ‘청구기호’라는 고유번호가 붙어있기 때문에, 사람들은 청구기호를 통해서만 책을 찾을 수 있다.
도서관에서 제공하는 도서검색 서비스를 이용해도 얻을 수 있는 정보는, 책의 존재 여부와 청구기호 뿐이다.
길고 복잡한 청구기호만으로 책을 찾는 것은 불편하고 어려운 일이다. 따라서 조용한 도서관의 분위기를
방해하지 않고, 신속하고 편하게 원하는 도서를 찾을 수 있도록 동국대학교 중앙도서관의 책 지도 프로그램을
만들고자 한다.

## 3. DB ERD
<img src="https://github.com/DGU-DOGE/DOGE/assets/96279437/53d79fc1-6063-4393-a339-95327d264b61" width="500"/>

## 4. 기능 소개

1️⃣ 메인화면

<img src="https://github.com/DGU-DOGE/DOGE/assets/96279437/ba87a4e6-5437-4247-984e-c86d6081e475" width="430"/>

2️⃣ 회원가입

<img src="https://github.com/DGU-DOGE/DOGE/assets/96279437/9d0d1a44-93ce-4202-adb9-f41e1dc23afd" width="430" />

3️⃣ 도서검색

<img src="https://github.com/DGU-DOGE/DOGE/assets/96279437/06a91b8b-690e-49a8-8b0a-53171c8ed7bd" width="430" />

4️⃣ 도서상세정보 확인 및 지도 확인

<img src="https://github.com/DGU-DOGE/DOGE/assets/96279437/77658035-e521-4667-9176-ed257ab38f7a" width="430" />

5️⃣ 도서 즐겨찾기 및 삭제

<img src="https://github.com/DGU-DOGE/DOGE/assets/96279437/e537d119-bdb8-46f3-8d26-9483c6a8bd5c" width="430" />

## 5. 크롤링 & 책 정보 처리 알고리즘
>크롤링은 자바 스프링 환경에서 셀레니움을 사용하여 진행하였다.</br>
> 중앙도서관 홈페이지에서 통합검색 > 소장자료의 URL을 임의로 설정하여 동국대학교 중앙도서관에서 소장하고 있는 모든 단행본을 검색하였다.</br>
> 첫 페이지에서 다음 페이지로 넘기면서 도서 정보(청구기호, 서명, 저자, 출판사, 사진 링크)를 크롤링한다. </br>
![중도 검색](https://github.com/DGU-DOGE/DOGE/assets/126967574/b5594440-0f5b-46fa-88b5-25195ab6e8ff)
></br></br></br>
> 
> 청구기호를 크롤링하기 위해 좌측에 보이는 '중앙도서관 대출가능' 버튼을 셀레니움으로 클릭한 뒤 진행한다. </br>
![도서 정보](https://github.com/DGU-DOGE/DOGE/assets/126967574/c7d94fd7-22a9-4503-8d1c-a1d276b76a2c)
></br></br></br>
> 크롤링한 데이터는 책에 대한 정보만 있을 뿐, 위치에 대한 정보는 크롤링 할 수 없기 때문에 별도의 연산 처리 로직이 필요하다.</br>
> 아래 사진에서 층 정보, 책장 정보 등에는 모두 null로 채워져 있는 것을 확인할 수 있다.
> ![db이미지](https://github.com/DGU-DOGE/DOGE/assets/126967574/e5064f57-c1ab-491c-a6ae-c290da4a7a13)
></br></br></br>
> 책의 위치를 계산하기 위해 우선 중앙도서관에 방문하여 중앙도서관에 있는 모든 서가의 청구기호 범위와 이름을 조사하였다.</br>
> 이후 책이 청구기호의 범위에 속하는지 판단하는 알고리즘을 구현하여 책과 서가를 맵핑하였다. 보존도서나 특수한 책은 서가에 존재하지
> 않기 때문에 맵핑하지 않았다.</br></br>
> 이후 SQL을 활용하여 책을 청구기호 순으로 정렬한 뒤, 각 서가에 몇 권의 도서가 존재하는지 SQL의 count를 사용하여 계산한다.</br>
> 이렇게 계산한 서가마다의 총 도서 수를 서가에 존재하는 책장의 수만큼 균등분할하여 SHELF_COUNT를 계산한다.</br>
> 이 작업을 BOOK_ROW에 대해서도 실행하여 BOOK_ROW도 계산할 수 있다.</br>
> BOOK_CELL을 연산하기 위해 균등분할을 한다면 다중 반복으로 인한 시간 복잡도가 너무 높아지기 때문에 BOOK_ROW의 값을</br>
> 순서대로 가져와 이번에 가져온 값이 앞에 가져온 값과 달라지면 다시 1부터 증가하는 방법을 사용하였다.

## 🎯 Commit Convention

-   feat : 새로운 기능 추가
-   fix : 버그 수정
-   docs : 문서 수정
-   style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
-   refactor: 코드 리펙토링
-   test: 테스트 코드, 리펙토링 테스트 코드 추가
-   chore : 빌드 업무 수정, 패키지 매니저 수정




## 💡 PR Convetion

| 아이콘 | 코드                       | 설명                     |
| ------ | -------------------------- | ------------------------ |
| 🎨     | :art                       | 코드의 구조/형태 개선    |
| ⚡️    | :zap                       | 성능 개선                |
| 🔥     | :fire                      | 코드/파일 삭제           |
| 🐛     | :bug                       | 버그 수정                |
| 🚑     | :ambulance                 | 긴급 수정                |
| ✨     | :sparkles                  | 새 기능                  |
| 💄     | :lipstick                  | UI/스타일 파일 추가/수정 |
| ⏪     | :rewind                    | 변경 내용 되돌리기       |
| 🔀     | :twisted_rightwards_arrows | 브랜치 합병              |
| 💡     | :bulb                      | 주석 추가/수정           |
| 🗃      | :card_file_box             | 데이버베이스 관련 수정   |
