package hello.hellospring.dataprocessing;

public class CallNumberRange {
    private String start;
    private String middle1;
    private String middle2;
    private String end;
    private String floor;
    private String shelfName;
    private int count;

    public CallNumberRange(String shelfName, String floor, String start, String middle1, String middle2, String end, int count) {
        this.start = start;
        this.middle1 = middle1;
        this.middle2 = middle2;
        this.end = end;
        this.floor = floor;
        this.shelfName = shelfName;
        this.count = count;
    }

    public String getShelfName() {
        return shelfName;
    }

    public String getFloor() {
        return floor;
    }

    public String getStart() {
        return start;
    }

    public String getEnd() {
        return end;
    }

    public int getCount() {
        return count;
    }
}