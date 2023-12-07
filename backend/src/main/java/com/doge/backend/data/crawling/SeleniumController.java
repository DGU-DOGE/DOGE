package hello.hellospring.crawling;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.concurrent.*;

@RestController
public class SeleniumController {
    private int pageNum = 1;
    private int start = 1;
    private int loop = 200;
    private final int add = 200;
    private final int end = 16292;
    private final int cpp = 50;
    private final int MAX_RETRY = 3;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private long printTimestamp() {  // 타임스탬프 출력
        long currentTime = System.currentTimeMillis();
        Timestamp timestamp = new Timestamp(currentTime);
        SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");    // 해당 format으로 출력
        System.out.println(sdf.format(timestamp));

        return currentTime;
    }

    private void printInsertSQL(StringBuilder result) {  // 크롤링한 데이터를 Insert문으로 정리하여 txt파일로 저장
        BufferedOutputStream bs = null;
        try{
            bs = new BufferedOutputStream(new FileOutputStream("C:\\IntelliJ_Workspace\\hello-spring\\src\\main\\resources\\sql_crawl\\"+ pageNum +".txt"));    // txt파일 저장 위치
            bs.write(result.toString().getBytes());
        } catch (Exception e){
            e.getStackTrace();
            System.err.println("Exception 발생: 파일 입출력 에러");
        } finally {
            if (bs != null){
                try {
                    bs.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    System.err.println("IOException 발생: 파일 입출력 null 에러");
                }
            }
        }
    }

    private void sqlExecute(StringBuilder result) {  // Insert문 db에 실행
        String sql = result.toString();
        try {
            jdbcTemplate.execute(sql);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
    }

    private void clearTaskkill() throws IOException {   // chromedriver가 정상적으로 종료되지 않고 누적되는 것을 막기 위해 한번의 루프가 끝날 때마다 taskkill을 입력
        Runtime.getRuntime().exec("cmd /c " + "taskkill /f /im chromedriver.exe");
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException ie){
            System.err.println("InterruptedException 발생: taskkill 이후 timeout 에러");
            ie.printStackTrace();
        }
    }

    private String URLgenerator(int page){
        String pageUrl = "https://lib.dongguk.edu/search/tot/result?pn=" + Integer.toString(page) +
                "&st=FRNT&commandType=advanced&mId=&si=12&q=0&b0=or&weight0=&si=12&q=1&b1=or&weight1=&si=12&q=2&b2=or&weight2=&si=12&q=3&b3=or&weight3=&si=12&q=4&b4=or&weight4=&si=12&q=5&b5=or&weight5=&si=12&q=6&b6=or&weight6=&si=12&q=7&b7=or&weight7=&si=12&q=8&b8=or&weight8=&si=12&q=9&weight9=&_lmt0=on&lmtsn=000000000001&lmtst=OR&lmt0=m&_lmt0=on&_lmt0=on&_lmt0=on&_lmt0=on&_lmt0=on&_lmt0=on&_lmt0=on&_lmt0=on&_lmt0=on&inc=TOTAL&_inc=on&_inc=on&_inc=on&_inc=on&_inc=on&lmt1=TOTAL&lmtsn=000000000003&lmtst=OR&lmt2=0000000A&lmtsn=000000000006&lmtst=OR&rf=&rt=&range=000000000021&" +
                "cpp=" + Integer.toString(cpp) + "&msc=814354";
        return pageUrl;
    }

    private StringBuilder processFutures(List<Future<String>> futures) {
        int count = 0;
        int retry_flag = 0;
        StringBuilder result = new StringBuilder();
        for (Future<String> future : futures) {
            count++;
            while (retry_flag < MAX_RETRY){
                try {
                    // 각 스레드의 작업 결과를 받아옴
                    result.append(future.get());
                    break;  // 성공적으로 결과를 받았으면 반복문 종료
                } catch (InterruptedException | ExecutionException e) {
                    System.err.println("InterruptedException or ExecutionException 발생: StringBuilder 에러 num: " + pageNum + " - " + count + " - " + retry_flag);
                    e.printStackTrace();
                    try {
                        TimeUnit.MILLISECONDS.sleep(1000);
                    } catch (InterruptedException ie){
                        System.err.println("InterruptedException 발생: StringBuilder 이후 timeout 에러");
                        ie.printStackTrace();
                    } finally {
                        retry_flag++;
                    }
                } catch (Exception e){
                    e.printStackTrace();
                    retry_flag++;
                }
            }
        }
        return result;
    }

    @GetMapping("crawler")
    public String selenium() throws IOException {
        // 타임스탬프 출력
        System.out.println("####START####");
        long beforeTime = printTimestamp();

        while(loop <= end){
            // Thread pool 개수 설정(컴퓨터 환경에 따라 다르게 설정)
            ExecutorService executor = Executors.newFixedThreadPool(10);
            List<Future<String>> futures = new ArrayList<>();

            for (int i = start; i <= loop; i++){
                String pageUrl = URLgenerator(i);
                Future<String> future = executor.submit(new SeleniumCrawler(pageUrl, i));
                futures.add(future);
            }

            // 크롤링 결과를 받아와서 StringBuilder로 만듦
            StringBuilder result = processFutures(futures);

            executor.shutdown();
            try {
                executor.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
            } catch (InterruptedException e) {
                System.err.println("InterruptedException 발생: Thread 종료 에러");
                e.printStackTrace();
            }

            // SQL 출력 및 실행
            printInsertSQL(result);
            sqlExecute(result);

            // 루프마다 chromedriver 정리
            clearTaskkill();

            pageNum += 1;
            start += add;
            loop += add;
        }

        // 타임스탬프 출력
        System.out.println("####END####");
        long afterTime = printTimestamp();
        System.out.print((afterTime - beforeTime)/60000 + "min ");
        System.out.println((afterTime - beforeTime)%60000/1000 + "sec");

        return "Data 크롤링 완료";
    }
}
