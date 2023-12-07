package hello.hellospring.crawling;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

public class SeleniumCrawler implements Callable<String> {
    private final int cpp = 50;
    private final int MAX_RETRY = 3;
    private String url;
    private int loop;
    private Path path = Paths.get("C:\\webdriver\\chromedriver-win64\\chromedriver.exe");   // 크롬드라이버 경로 입력
    private WebDriver driver;
    private WebDriverWait webDriverWait;
    private final int WEB_DRIVER_WAIT_TIME = 20;

    public SeleniumCrawler(String url, int loop) {
        this.url = url;
        this.loop = loop;
    }

    public ChromeOptions createChromeOptions() {    // Webdriver 세팅
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-popup-blocking");   // 팝업 안띄움
        options.addArguments("--headless");   // 브라우저 안띄움
        options.addArguments("--disable-gpu");  // gpu 비활성화
        options.addArguments("--lang=ko");
        options.addArguments("--blink-settings=imagesEnabled=false");   // 이미지 다운 안받음
        options.addArguments("--disable-ipc-flooding-protection");
        options.addArguments("--disable-extensions");   // 확장 프로그램 비활성화
        options.addArguments("--disable-infobars");
        options.addArguments("--disable-logging");

        Map<String, Object> contentSettings = getStringObjectMap();

        Map<String, Object> prefs = new HashMap<>();
        prefs.put("profile.default_content_setting_values", contentSettings);

        options.setExperimentalOption("prefs", prefs);

        return options;
    }

    private static Map<String, Object> getStringObjectMap() {   // Webdriver 옵션
        Map<String, Object> contentSettings = new HashMap<>();
        contentSettings.put("cookies", 2);
        contentSettings.put("images", 2);
        contentSettings.put("plugins", 2);
        contentSettings.put("popups", 2);
        contentSettings.put("geolocation", 2);
        contentSettings.put("notifications", 2);
        contentSettings.put("auto_select_certificate", 2);
        contentSettings.put("fullscreen", 2);
        contentSettings.put("mouselock", 2);
        contentSettings.put("mixed_script", 2);
        contentSettings.put("media_stream", 2);
        contentSettings.put("media_stream_mic", 2);
        contentSettings.put("media_stream_camera", 2);
        contentSettings.put("protocol_handlers", 2);
        contentSettings.put("ppapi_broker", 2);
        contentSettings.put("automatic_downloads", 2);
        contentSettings.put("midi_sysex", 2);
        contentSettings.put("push_messaging", 2);
        contentSettings.put("ssl_cert_decisions", 2);
        contentSettings.put("metro_switch_to_desktop", 2);
        contentSettings.put("protected_media_identifier", 2);
        contentSettings.put("app_banner", 2);
        contentSettings.put("site_engagement", 2);
        contentSettings.put("durable_storage", 2);
        return contentSettings;
    }

    private void initializeWebDriver() {    // Webdriver 초기화
        System.setProperty("webdriver.chrome.driver", path.toString());

        int sysRetryFlag = 0;
        while(sysRetryFlag < MAX_RETRY) {
            try {
                ChromeOptions options = createChromeOptions();
                this.driver = new ChromeDriver(options);

                this.webDriverWait = new WebDriverWait(this.driver, Duration.ofSeconds(WEB_DRIVER_WAIT_TIME));    // 드라이버가 실행된 후 20초 기다림
                break;
            } catch (SessionNotCreatedException se) {
                System.err.println("SessionNotCreatedException 발생 - 에러: Driver Config");
                se.printStackTrace();
                sysRetryFlag++;
                try {
                    this.driver.quit();
                } catch (NullPointerException ne) {
                    System.err.println("NullPointerException 발생 - 에러: driver가 생성되지 않음");
                    ne.printStackTrace();
                }
            }
        }
    }

    private String processData() {
        String result = "INSERT INTO BOOK (CALL_NUMBER, BOOK_NAME, AUTHOR, PUBLISHER, PHOTO_LINK) VALUES ";

        List<WebElement> contents = getContent();

        javaScriptExecute(contents);

        result += extractDataFromElement(contents);

        return result;
    }

    private List<WebElement> getContent() { // WebElement를 긁어옴
        By elementLocator = By.cssSelector("#divContent > div > div.briefContent > div.result > form > fieldset > ul > li");
        this.webDriverWait.until(ExpectedConditions.presenceOfElementLocated(elementLocator));
        return this.driver.findElements(elementLocator);
    }

    private void javaScriptExecute(List<WebElement> contents) { // 도서 청구기호 크롤링을 위해 접힌 부분 클릭
        JavascriptExecutor js = (JavascriptExecutor) this.driver;
        int bookCount = 0;

        for (WebElement holding : contents) {
            WebElement hold = holding.findElement(By.cssSelector("dl > dd.holdingInfo > div > p > a"));
            js.executeScript("arguments[0].click()", hold);
            System.out.println(bookCount++);
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
    private String extractDataFromElement(List<WebElement> contents) {
        String result = "";
        int bookCount = 0, error_code;
        String callNum, title, author, publisher;
        String callNumSelector = "dl > dd.holdingInfo > div.holding > div.holdingW > div.listTable > table > tbody > tr > td.callNum";
        String titleSelector = "dl > dd.title > a";
        String authorSelector = "dl > dd:nth-child(10)";
        String publisherSelector = "dl > dd:nth-child(12)";
        String imageSelector = "dl > dd.book > a > img";

        if (!contents.isEmpty()){
            for (WebElement content : contents) {

                // 도서 청구기호 추출
                try {
                    callNum = content.findElement(By.cssSelector(callNumSelector)).getAttribute("textContent").replace("'", "''");
                    result += "('" + callNum + "',";
                } catch (NoSuchElementException e) {
                    error_code = ((loop-1)*cpp)+(bookCount+1);
                    System.out.println("Error : " + error_code);
                    e.printStackTrace();
                    continue;
                }

                // 도서 제목 추출
                title = content.findElement(By.cssSelector(titleSelector)).getText().replace("'", "''");
                result += "'" + title + "',";

                // 도서 저자 추출
                try {
                    author = content.findElement(By.cssSelector(authorSelector)).getText().replace("'", "''");
                    result += "'" + author + "',";
                } catch (NoSuchElementException e) {
                    result += NoSuchElementExceptionHandler(bookCount, "author");
                }

                // 도서 출판사 추출
                try {
                    publisher = content.findElement(By.cssSelector(publisherSelector)).getText().replace("'", "''");
                    result += "'" + publisher + "',";
                } catch (NoSuchElementException e) {
                    result += NoSuchElementExceptionHandler(bookCount, "publisher");
                }

                // 도서 이미지 링크 추출
                WebElement img = content.findElement(By.cssSelector(imageSelector));
                String src = img.getAttribute("src").replace("'", "''");
                result += "'" + src + "')";

                bookCount++;

                // 마지막 책이라면 ;으로 sql문 닫기
                if (bookCount == cpp) {
                    result += "; ";
                    break;
                }
                else {
                    result += ",\n";
                }
            }
        }
        return result;
    }

    private String NoSuchElementExceptionHandler(int count, String exceptionPlace) {
        int error_code = ((loop-1)*cpp)+(count+1);
        System.out.println(error_code + " : " + exceptionPlace + " replaced NULL");
        return " NULL ,";
    }

    @Override
    public String call() throws Exception {
        this.driver = null;
        String result = "";
        initializeWebDriver();

        int retryFlag = 0;
        while(retryFlag < MAX_RETRY) {
            try {
                this.driver.get(url);
                result += processData();
                break;
            } catch (SessionNotCreatedException se) {
                System.err.println("SessionNotCreatedException 발생 - 에러: " + url);
                retryFlag++;
            } catch (TimeoutException te) {
                System.err.println("TimeoutException 발생 - 에러: " + url);
                retryFlag++;
            } finally {
                this.driver.quit();
            }
        }

        // 5000권마다 진행 척도 콘솔에 출력
        if (loop%100 == 0) System.out.println(loop*50);
        return result;
    }
}
