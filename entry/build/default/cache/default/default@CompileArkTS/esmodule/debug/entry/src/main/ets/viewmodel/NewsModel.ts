import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { PageState } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { NewsData } from '../model/NewsData';
export default class NewsModel {
    newsData: Array<NewsData> = [];
    currentPage: number = 1;
    pageSize: number = Const.PAGE_SIZE;
    pullDownRefreshText: Resource = { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
    pullDownRefreshImage: Resource = { "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
    pullDownRefreshHeight: number = Const.CUSTOM_LAYOUT_HEIGHT;
    isVisiblePullDown: boolean = false;
    pullUpLoadText: Resource = { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
    pullUpLoadImage: Resource = { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
    pullUpLoadHeight: number = Const.CUSTOM_LAYOUT_HEIGHT;
    isVisiblePullUpLoad: boolean = false;
    offsetY: number = 0;
    pageState: number = 0;
    hasMore: boolean = true;
    startIndex = 0;
    endIndex = 0;
    downY = 0;
    lastMoveY = 0;
    isRefreshing: boolean = false;
    isCanRefresh = false;
    isPullRefreshOperation = false;
    isLoading: boolean = false;
    isCanLoadMore: boolean = false;
}
