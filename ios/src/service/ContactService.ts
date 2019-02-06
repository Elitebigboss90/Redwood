// import * as ServiceSpec from "../spec/service"
// import * as Leaf from "leaf-ts"
// import * as uuid from "uuid"
// export const Errors = Leaf.ErrorDoc.build({
// })
// export class ContactService extends ServiceSpec.ContactService {
//     initialize() {
//     }
// }
//（已改 嘉峪关／三亚市／广东-潮州 少 枫溪区/东莞／中山）
export const districtMap: ContactService.District[] = [
    {
        children: [
            {
                children: [
                    { code: "110102", name: "西城区", level: "area" },
                    { code: "110101", name: "东城区", level: "area" },
                    { code: "110105", name: "朝阳区", level: "area" },
                    { code: "110106", name: "丰台区", level: "area" },
                    { code: "110107", name: "石景山区", level: "area" },
                    { code: "110108", name: "海淀区", level: "area" },
                    { code: "110109", name: "门头沟区", level: "area" },
                    { code: "110111", name: "房山区", level: "area" },
                    { code: "110112", name: "通州区", level: "area" },
                    { code: "110113", name: "顺义区", level: "area" },
                    { code: "110114", name: "昌平区", level: "area" },
                    { code: "110115", name: "大兴区", level: "area" },
                    { code: "110116", name: "怀柔区", level: "area" },
                    { code: "110117", name: "平谷区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "110100", name: "北京市", level: "city"
            },
            {
                children: [
                    { code: "110228", name: "密云县", level: "area" },
                    { code: "110229", name: "延庆县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "110200", name: "县", level: "city"
            }
        ], code: "110000", name: "北京市", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "120101", name: "和平区", level: "area" },
                    { code: "120102", name: "河东区", level: "area" },
                    { code: "120103", name: "河西区", level: "area" },
                    { code: "120104", name: "南开区", level: "area" },
                    { code: "120105", name: "河北区", level: "area" },
                    { code: "120106", name: "红桥区", level: "area" },
                    { code: "120110", name: "东丽区", level: "area" },
                    { code: "120111", name: "西青区", level: "area" },
                    { code: "120112", name: "津南区", level: "area" },
                    { code: "120113", name: "北辰区", level: "area" },
                    { code: "120114", name: "武清区", level: "area" },
                    { code: "120115", name: "宝坻区", level: "area" },
                    { code: "120116", name: "滨海新区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "120100", name: "天津市", level: "city"
            },
            {
                children: [
                    { code: "120221", name: "宁河县", level: "area" },
                    { code: "120223", name: "静海县", level: "area" },
                    { code: "120225", name: "蓟县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "120200", name: "县", level: "city"
            }
        ], code: "120000", name: "天津市", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "130102", name: "长安区", level: "area" },
                    { code: "130103", name: "桥东区", level: "area" },
                    { code: "130104", name: "桥西区", level: "area" },
                    { code: "130105", name: "新华区", level: "area" },
                    { code: "130107", name: "井陉矿区", level: "area" },
                    { code: "130108", name: "裕华区", level: "area" },
                    { code: "130121", name: "井陉县", level: "area" },
                    { code: "130123", name: "正定县", level: "area" },
                    { code: "130124", name: "栾城县", level: "area" },
                    { code: "130125", name: "行唐县", level: "area" },
                    { code: "130126", name: "灵寿县", level: "area" },
                    { code: "130127", name: "高邑县", level: "area" },
                    { code: "130128", name: "深泽县", level: "area" },
                    { code: "130129", name: "赞皇县", level: "area" },
                    { code: "130130", name: "无极县", level: "area" },
                    { code: "130131", name: "平山县", level: "area" },
                    { code: "130132", name: "元氏县", level: "area" },
                    { code: "130133", name: "赵县", level: "area" },
                    { code: "130181", name: "辛集市", level: "area" },
                    { code: "130182", name: "藁城市", level: "area" },
                    { code: "130183", name: "晋州市", level: "area" },
                    { code: "130184", name: "新乐市", level: "area" },
                    { code: "130185", name: "鹿泉市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "130100", name: "石家庄市", level: "city"
            },
            {
                children: [
                    { code: "130202", name: "路南区", level: "area" },
                    { code: "130203", name: "路北区", level: "area" },
                    { code: "130204", name: "古冶区", level: "area" },
                    { code: "130205", name: "开平区", level: "area" },
                    { code: "130207", name: "丰南区", level: "area" },
                    { code: "130208", name: "丰润区", level: "area" },
                    { code: "130209", name: "曹妃甸区", level: "area" },
                    { code: "130223", name: "滦县", level: "area" },
                    { code: "130224", name: "滦南县", level: "area" },
                    { code: "130225", name: "乐亭县", level: "area" },
                    { code: "130227", name: "迁西县", level: "area" },
                    { code: "130229", name: "玉田县", level: "area" },
                    { code: "130281", name: "遵化市", level: "area" },
                    { code: "130283", name: "迁安市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "130200", name: "唐山市", level: "city"
            },
            {
                children: [
                    { code: "130302", name: "海港区", level: "area" },
                    { code: "130303", name: "山海关区", level: "area" },
                    { code: "130304", name: "北戴河区", level: "area" },
                    { code: "130321", name: "青龙满族自治县", level: "area" },
                    { code: "130322", name: "昌黎县", level: "area" },
                    { code: "130323", name: "抚宁县", level: "area" },
                    { code: "130324", name: "卢龙县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "130300", name: "秦皇岛市", level: "city"
            },
            {
                children: [
                    { code: "130402", name: "邯山区", level: "area" },
                    { code: "130403", name: "丛台区", level: "area" },
                    { code: "130404", name: "复兴区", level: "area" },
                    { code: "130406", name: "峰峰矿区", level: "area" },
                    { code: "130421", name: "邯郸县", level: "area" },
                    { code: "130423", name: "临漳县", level: "area" },
                    { code: "130424", name: "成安县", level: "area" },
                    { code: "130425", name: "大名县", level: "area" },
                    { code: "130426", name: "涉县", level: "area" },
                    { code: "130427", name: "磁县", level: "area" },
                    { code: "130428", name: "肥乡县", level: "area" },
                    { code: "130429", name: "永年县", level: "area" },
                    { code: "130430", name: "邱县", level: "area" },
                    { code: "130431", name: "鸡泽县", level: "area" },
                    { code: "130432", name: "广平县", level: "area" },
                    { code: "130433", name: "馆陶县", level: "area" },
                    { code: "130434", name: "魏县", level: "area" },
                    { code: "130435", name: "曲周县", level: "area" },
                    { code: "130481", name: "武安市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "130400", name: "邯郸市", level: "city"
            },
            {
                children: [
                    { code: "130502", name: "桥东区", level: "area" },
                    { code: "130503", name: "桥西区", level: "area" },
                    { code: "130521", name: "邢台县", level: "area" },
                    { code: "130522", name: "临城县", level: "area" },
                    { code: "130523", name: "内丘县", level: "area" },
                    { code: "130524", name: "柏乡县", level: "area" },
                    { code: "130525", name: "隆尧县", level: "area" },
                    { code: "130526", name: "任县", level: "area" },
                    { code: "130527", name: "南和县", level: "area" },
                    { code: "130528", name: "宁晋县", level: "area" },
                    { code: "130529", name: "巨鹿县", level: "area" },
                    { code: "130530", name: "新河县", level: "area" },
                    { code: "130531", name: "广宗县", level: "area" },
                    { code: "130532", name: "平乡县", level: "area" },
                    { code: "130533", name: "威县", level: "area" },
                    { code: "130534", name: "清河县", level: "area" },
                    { code: "130535", name: "临西县", level: "area" },
                    { code: "130581", name: "南宫市", level: "area" },
                    { code: "130582", name: "沙河市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "130500", name: "邢台市", level: "city"
            },
            {
                children: [
                    { code: "130602", name: "新市区", level: "area" },
                    { code: "130603", name: "北市区", level: "area" },
                    { code: "130604", name: "南市区", level: "area" },
                    { code: "130621", name: "满城县", level: "area" },
                    { code: "130622", name: "清苑县", level: "area" },
                    { code: "130623", name: "涞水县", level: "area" },
                    { code: "130624", name: "阜平县", level: "area" },
                    { code: "130625", name: "徐水县", level: "area" },
                    { code: "130626", name: "定兴县", level: "area" },
                    { code: "130627", name: "唐县", level: "area" },
                    { code: "130628", name: "高阳县", level: "area" },
                    { code: "130629", name: "容城县", level: "area" },
                    { code: "130630", name: "涞源县", level: "area" },
                    { code: "130631", name: "望都县", level: "area" },
                    { code: "130632", name: "安新县", level: "area" },
                    { code: "130633", name: "易县", level: "area" },
                    { code: "130634", name: "曲阳县", level: "area" },
                    { code: "130635", name: "蠡县", level: "area" },
                    { code: "130636", name: "顺平县", level: "area" },
                    { code: "130637", name: "博野县", level: "area" },
                    { code: "130638", name: "雄县", level: "area" },
                    { code: "130681", name: "涿州市", level: "area" },
                    { code: "130682", name: "定州市", level: "area" },
                    { code: "130683", name: "安国市", level: "area" },
                    { code: "130684", name: "高碑店市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "130600", name: "保定市", level: "city"
            },
            {
                children: [
                    { code: "130702", name: "桥东区", level: "area" },
                    { code: "130703", name: "桥西区", level: "area" },
                    { code: "130705", name: "宣化区", level: "area" },
                    { code: "130706", name: "下花园区", level: "area" },
                    { code: "130721", name: "宣化县", level: "area" },
                    { code: "130722", name: "张北县", level: "area" },
                    { code: "130723", name: "康保县", level: "area" },
                    { code: "130724", name: "沽源县", level: "area" },
                    { code: "130725", name: "尚义县", level: "area" },
                    { code: "130726", name: "蔚县", level: "area" },
                    { code: "130727", name: "阳原县", level: "area" },
                    { code: "130728", name: "怀安县", level: "area" },
                    { code: "130729", name: "万全县", level: "area" },
                    { code: "130730", name: "怀来县", level: "area" },
                    { code: "130731", name: "涿鹿县", level: "area" },
                    { code: "130732", name: "赤城县", level: "area" },
                    { code: "130733", name: "崇礼县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "130700", name: "张家口市", level: "city"
            },
            {
                children: [
                    { code: "130802", name: "双桥区", level: "area" },
                    { code: "130803", name: "双滦区", level: "area" },
                    { code: "130804", name: "鹰手营子矿区", level: "area" },
                    { code: "130821", name: "承德县", level: "area" },
                    { code: "130822", name: "兴隆县", level: "area" },
                    { code: "130823", name: "平泉县", level: "area" },
                    { code: "130824", name: "滦平县", level: "area" },
                    { code: "130825", name: "隆化县", level: "area" },
                    { code: "130826", name: "丰宁满族自治县", level: "area" },
                    { code: "130827", name: "宽城满族自治县", level: "area" },
                    { code: "130828", name: "围场满族蒙古族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "130800", name: "承德市", level: "city"
            },
            {
                children: [
                    { code: "130902", name: "新华区", level: "area" },
                    { code: "130903", name: "运河区", level: "area" },
                    { code: "130921", name: "沧县", level: "area" },
                    { code: "130922", name: "青县", level: "area" },
                    { code: "130923", name: "东光县", level: "area" },
                    { code: "130924", name: "海兴县", level: "area" },
                    { code: "130925", name: "盐山县", level: "area" },
                    { code: "130926", name: "肃宁县", level: "area" },
                    { code: "130927", name: "南皮县", level: "area" },
                    { code: "130928", name: "吴桥县", level: "area" },
                    { code: "130929", name: "献县", level: "area" },
                    { code: "130930", name: "孟村回族自治县", level: "area" },
                    { code: "130981", name: "泊头市", level: "area" },
                    { code: "130982", name: "任丘市", level: "area" },
                    { code: "130983", name: "黄骅市", level: "area" },
                    { code: "130984", name: "河间市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "130900", name: "沧州市", level: "city"
            },
            {
                children: [
                    { code: "131002", name: "安次区", level: "area" },
                    { code: "131003", name: "广阳区", level: "area" },
                    { code: "131022", name: "固安县", level: "area" },
                    { code: "131023", name: "永清县", level: "area" },
                    { code: "131024", name: "香河县", level: "area" },
                    { code: "131025", name: "大城县", level: "area" },
                    { code: "131026", name: "文安县", level: "area" },
                    { code: "131028", name: "大厂回族自治县", level: "area" },
                    { code: "131081", name: "霸州市", level: "area" },
                    { code: "131082", name: "三河市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "131000", name: "廊坊市", level: "city"
            },
            {
                children: [
                    { code: "131102", name: "桃城区", level: "area" },
                    { code: "131121", name: "枣强县", level: "area" },
                    { code: "131122", name: "武邑县", level: "area" },
                    { code: "131123", name: "武强县", level: "area" },
                    { code: "131124", name: "饶阳县", level: "area" },
                    { code: "131125", name: "安平县", level: "area" },
                    { code: "131126", name: "故城县", level: "area" },
                    { code: "131127", name: "景县", level: "area" },
                    { code: "131128", name: "阜城县", level: "area" },
                    { code: "131181", name: "冀州市", level: "area" },
                    { code: "131182", name: "深州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "131100", name: "衡水市", level: "city"
            }
        ], code: "130000", name: "河北省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "140105", name: "小店区", level: "area" },
                    { code: "140106", name: "迎泽区", level: "area" },
                    { code: "140107", name: "杏花岭区", level: "area" },
                    { code: "140108", name: "尖草坪区", level: "area" },
                    { code: "140109", name: "万柏林区", level: "area" },
                    { code: "140110", name: "晋源区", level: "area" },
                    { code: "140121", name: "清徐县", level: "area" },
                    { code: "140122", name: "阳曲县", level: "area" },
                    { code: "140123", name: "娄烦县", level: "area" },
                    { code: "140181", name: "古交市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "140100", name: "太原市", level: "city"
            },
            {
                children: [
                    { code: "140202", name: "城区", level: "area" },
                    { code: "140203", name: "矿区", level: "area" },
                    { code: "140211", name: "南郊区", level: "area" },
                    { code: "140212", name: "新荣区", level: "area" },
                    { code: "140221", name: "阳高县", level: "area" },
                    { code: "140222", name: "天镇县", level: "area" },
                    { code: "140223", name: "广灵县", level: "area" },
                    { code: "140224", name: "灵丘县", level: "area" },
                    { code: "140225", name: "浑源县", level: "area" },
                    { code: "140226", name: "左云县", level: "area" },
                    { code: "140227", name: "大同县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "140200", name: "大同市", level: "city"
            },
            {
                children: [
                    { code: "140302", name: "城区", level: "area" },
                    { code: "140303", name: "矿区", level: "area" },
                    { code: "140311", name: "郊区", level: "area" },
                    { code: "140321", name: "平定县", level: "area" },
                    { code: "140322", name: "盂县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "140300", name: "阳泉市", level: "city"
            },
            {
                children: [
                    { code: "140402", name: "城区", level: "area" },
                    { code: "140411", name: "郊区", level: "area" },
                    { code: "140421", name: "长治县", level: "area" },
                    { code: "140423", name: "襄垣县", level: "area" },
                    { code: "140424", name: "屯留县", level: "area" },
                    { code: "140425", name: "平顺县", level: "area" },
                    { code: "140426", name: "黎城县", level: "area" },
                    { code: "140427", name: "壶关县", level: "area" },
                    { code: "140428", name: "长子县", level: "area" },
                    { code: "140429", name: "武乡县", level: "area" },
                    { code: "140430", name: "沁县", level: "area" },
                    { code: "140431", name: "沁源县", level: "area" },
                    { code: "140481", name: "潞城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "140400", name: "长治市", level: "city"
            },
            {
                children: [
                    { code: "140502", name: "城区", level: "area" },
                    { code: "140521", name: "沁水县", level: "area" },
                    { code: "140522", name: "阳城县", level: "area" },
                    { code: "140524", name: "陵川县", level: "area" },
                    { code: "140525", name: "泽州县", level: "area" },
                    { code: "140581", name: "高平市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "140500", name: "晋城市", level: "city"
            },
            {
                children: [
                    { code: "140602", name: "朔城区", level: "area" },
                    { code: "140603", name: "平鲁区", level: "area" },
                    { code: "140621", name: "山阴县", level: "area" },
                    { code: "140622", name: "应县", level: "area" },
                    { code: "140623", name: "右玉县", level: "area" },
                    { code: "140624", name: "怀仁县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "140600", name: "朔州市", level: "city"
            },
            {
                children: [
                    { code: "140702", name: "榆次区", level: "area" },
                    { code: "140721", name: "榆社县", level: "area" },
                    { code: "140722", name: "左权县", level: "area" },
                    { code: "140723", name: "和顺县", level: "area" },
                    { code: "140724", name: "昔阳县", level: "area" },
                    { code: "140725", name: "寿阳县", level: "area" },
                    { code: "140726", name: "太谷县", level: "area" },
                    { code: "140727", name: "祁县", level: "area" },
                    { code: "140728", name: "平遥县", level: "area" },
                    { code: "140729", name: "灵石县", level: "area" },
                    { code: "140781", name: "介休市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "140700", name: "晋中市", level: "city"
            },
            {
                children: [
                    { code: "140802", name: "盐湖区", level: "area" },
                    { code: "140821", name: "临猗县", level: "area" },
                    { code: "140822", name: "万荣县", level: "area" },
                    { code: "140823", name: "闻喜县", level: "area" },
                    { code: "140824", name: "稷山县", level: "area" },
                    { code: "140825", name: "新绛县", level: "area" },
                    { code: "140826", name: "绛县", level: "area" },
                    { code: "140827", name: "垣曲县", level: "area" },
                    { code: "140828", name: "夏县", level: "area" },
                    { code: "140829", name: "平陆县", level: "area" },
                    { code: "140830", name: "芮城县", level: "area" },
                    { code: "140881", name: "永济市", level: "area" },
                    { code: "140882", name: "河津市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "140800", name: "运城市", level: "city"
            },
            {
                children: [
                    { code: "140902", name: "忻府区", level: "area" },
                    { code: "140921", name: "定襄县", level: "area" },
                    { code: "140922", name: "五台县", level: "area" },
                    { code: "140923", name: "代县", level: "area" },
                    { code: "140924", name: "繁峙县", level: "area" },
                    { code: "140925", name: "宁武县", level: "area" },
                    { code: "140926", name: "静乐县", level: "area" },
                    { code: "140927", name: "神池县", level: "area" },
                    { code: "140928", name: "五寨县", level: "area" },
                    { code: "140929", name: "岢岚县", level: "area" },
                    { code: "140930", name: "河曲县", level: "area" },
                    { code: "140931", name: "保德县", level: "area" },
                    { code: "140932", name: "偏关县", level: "area" },
                    { code: "140981", name: "原平市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "140900", name: "忻州市", level: "city"
            },
            {
                children: [
                    { code: "141002", name: "尧都区", level: "area" },
                    { code: "141021", name: "曲沃县", level: "area" },
                    { code: "141022", name: "翼城县", level: "area" },
                    { code: "141023", name: "襄汾县", level: "area" },
                    { code: "141024", name: "洪洞县", level: "area" },
                    { code: "141025", name: "古县", level: "area" },
                    { code: "141026", name: "安泽县", level: "area" },
                    { code: "141027", name: "浮山县", level: "area" },
                    { code: "141028", name: "吉县", level: "area" },
                    { code: "141029", name: "乡宁县", level: "area" },
                    { code: "141030", name: "大宁县", level: "area" },
                    { code: "141031", name: "隰县", level: "area" },
                    { code: "141032", name: "永和县", level: "area" },
                    { code: "141033", name: "蒲县", level: "area" },
                    { code: "141034", name: "汾西县", level: "area" },
                    { code: "141081", name: "侯马市", level: "area" },
                    { code: "141082", name: "霍州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "141000", name: "临汾市", level: "city"
            },
            {
                children: [
                    { code: "141102", name: "离石区", level: "area" },
                    { code: "141121", name: "文水县", level: "area" },
                    { code: "141122", name: "交城县", level: "area" },
                    { code: "141123", name: "兴县", level: "area" },
                    { code: "141124", name: "临县", level: "area" },
                    { code: "141125", name: "柳林县", level: "area" },
                    { code: "141126", name: "石楼县", level: "area" },
                    { code: "141127", name: "岚县", level: "area" },
                    { code: "141128", name: "方山县", level: "area" },
                    { code: "141129", name: "中阳县", level: "area" },
                    { code: "141130", name: "交口县", level: "area" },
                    { code: "141181", name: "孝义市", level: "area" },
                    { code: "141182", name: "汾阳市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "141100", name: "吕梁市", level: "city"
            }
        ], code: "140000", name: "山西省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "150102", name: "新城区", level: "area" },
                    { code: "150103", name: "回民区", level: "area" },
                    { code: "150104", name: "玉泉区", level: "area" },
                    { code: "150105", name: "赛罕区", level: "area" },
                    { code: "150121", name: "土默特左旗", level: "area" },
                    { code: "150122", name: "托克托县", level: "area" },
                    { code: "150123", name: "和林格尔县", level: "area" },
                    { code: "150124", name: "清水河县", level: "area" },
                    { code: "150125", name: "武川县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "150100", name: "呼和浩特市", level: "city"
            },
            {
                children: [
                    { code: "150202", name: "东河区", level: "area" },
                    { code: "150203", name: "昆都仑区", level: "area" },
                    { code: "150204", name: "青山区", level: "area" },
                    { code: "150205", name: "石拐区", level: "area" },
                    { code: "150206", name: "白云鄂博矿区", level: "area" },
                    { code: "150207", name: "九原区", level: "area" },
                    { code: "150221", name: "土默特右旗", level: "area" },
                    { code: "150222", name: "固阳县", level: "area" },
                    { code: "150223", name: "达尔罕茂明安联合旗", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "150200", name: "包头市", level: "city"
            },
            {
                children: [
                    { code: "150302", name: "海勃湾区", level: "area" },
                    { code: "150303", name: "海南区", level: "area" },
                    { code: "150304", name: "乌达区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "150300", name: "乌海市", level: "city"
            },
            {
                children: [
                    { code: "150402", name: "红山区", level: "area" },
                    { code: "150403", name: "元宝山区", level: "area" },
                    { code: "150404", name: "松山区", level: "area" },
                    { code: "150421", name: "阿鲁科尔沁旗", level: "area" },
                    { code: "150422", name: "巴林左旗", level: "area" },
                    { code: "150423", name: "巴林右旗", level: "area" },
                    { code: "150424", name: "林西县", level: "area" },
                    { code: "150425", name: "克什克腾旗", level: "area" },
                    { code: "150426", name: "翁牛特旗", level: "area" },
                    { code: "150428", name: "喀喇沁旗", level: "area" },
                    { code: "150429", name: "宁城县", level: "area" },
                    { code: "150430", name: "敖汉旗", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "150400", name: "赤峰市", level: "city"
            },
            {
                children: [
                    { code: "150502", name: "科尔沁区", level: "area" },
                    { code: "150521", name: "科尔沁左翼中旗", level: "area" },
                    { code: "150522", name: "科尔沁左翼后旗", level: "area" },
                    { code: "150523", name: "开鲁县", level: "area" },
                    { code: "150524", name: "库伦旗", level: "area" },
                    { code: "150525", name: "奈曼旗", level: "area" },
                    { code: "150526", name: "扎鲁特旗", level: "area" },
                    { code: "150581", name: "霍林郭勒市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "150500", name: "通辽市", level: "city"
            },
            {
                children: [
                    { code: "150602", name: "东胜区", level: "area" },
                    { code: "150621", name: "达拉特旗", level: "area" },
                    { code: "150622", name: "准格尔旗", level: "area" },
                    { code: "150623", name: "鄂托克前旗", level: "area" },
                    { code: "150624", name: "鄂托克旗", level: "area" },
                    { code: "150625", name: "杭锦旗", level: "area" },
                    { code: "150626", name: "乌审旗", level: "area" },
                    { code: "150627", name: "伊金霍洛旗", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "150600", name: "鄂尔多斯市", level: "city"
            },
            {
                children: [
                    { code: "150702", name: "海拉尔区", level: "area" },
                    { code: "150703", name: "扎赉诺尔区", level: "area" },
                    { code: "150721", name: "阿荣旗", level: "area" },
                    { code: "150722", name: "莫力达瓦达斡尔族自治旗", level: "area" },
                    { code: "150723", name: "鄂伦春自治旗", level: "area" },
                    { code: "150724", name: "鄂温克族自治旗", level: "area" },
                    { code: "150725", name: "陈巴尔虎旗", level: "area" },
                    { code: "150726", name: "新巴尔虎左旗", level: "area" },
                    { code: "150727", name: "新巴尔虎右旗", level: "area" },
                    { code: "150781", name: "满洲里市", level: "area" },
                    { code: "150782", name: "牙克石市", level: "area" },
                    { code: "150783", name: "扎兰屯市", level: "area" },
                    { code: "150784", name: "额尔古纳市", level: "area" },
                    { code: "150785", name: "根河市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "150700", name: "呼伦贝尔市", level: "city"
            },
            {
                children: [
                    { code: "150802", name: "临河区", level: "area" },
                    { code: "150821", name: "五原县", level: "area" },
                    { code: "150822", name: "磴口县", level: "area" },
                    { code: "150823", name: "乌拉特前旗", level: "area" },
                    { code: "150824", name: "乌拉特中旗", level: "area" },
                    { code: "150825", name: "乌拉特后旗", level: "area" },
                    { code: "150826", name: "杭锦后旗", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "150800", name: "巴彦淖尔市", level: "city"
            },
            {
                children: [
                    { code: "150902", name: "集宁区", level: "area" },
                    { code: "150921", name: "卓资县", level: "area" },
                    { code: "150922", name: "化德县", level: "area" },
                    { code: "150923", name: "商都县", level: "area" },
                    { code: "150924", name: "兴和县", level: "area" },
                    { code: "150925", name: "凉城县", level: "area" },
                    { code: "150926", name: "察哈尔右翼前旗", level: "area" },
                    { code: "150927", name: "察哈尔右翼中旗", level: "area" },
                    { code: "150928", name: "察哈尔右翼后旗", level: "area" },
                    { code: "150929", name: "四子王旗", level: "area" },
                    { code: "150981", name: "丰镇市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "150900", name: "乌兰察布市", level: "city"
            },
            {
                children: [
                    { code: "152201", name: "乌兰浩特市", level: "area" },
                    { code: "152202", name: "阿尔山市", level: "area" },
                    { code: "152221", name: "科尔沁右翼前旗", level: "area" },
                    { code: "152222", name: "科尔沁右翼中旗", level: "area" },
                    { code: "152223", name: "扎赉特旗", level: "area" },
                    { code: "152224", name: "突泉县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "152200", name: "兴安盟", level: "city"
            },
            {
                children: [
                    { code: "152501", name: "二连浩特市", level: "area" },
                    { code: "152502", name: "锡林浩特市", level: "area" },
                    { code: "152522", name: "阿巴嘎旗", level: "area" },
                    { code: "152523", name: "苏尼特左旗", level: "area" },
                    { code: "152524", name: "苏尼特右旗", level: "area" },
                    { code: "152525", name: "东乌珠穆沁旗", level: "area" },
                    { code: "152526", name: "西乌珠穆沁旗", level: "area" },
                    { code: "152527", name: "太仆寺旗", level: "area" },
                    { code: "152528", name: "镶黄旗", level: "area" },
                    { code: "152529", name: "正镶白旗", level: "area" },
                    { code: "152530", name: "正蓝旗", level: "area" },
                    { code: "152531", name: "多伦县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "152500", name: "锡林郭勒盟", level: "city"
            },
            {
                children: [
                    { code: "152921", name: "阿拉善左旗", level: "area" },
                    { code: "152922", name: "阿拉善右旗", level: "area" },
                    { code: "152923", name: "额济纳旗", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "152900", name: "阿拉善盟", level: "city"
            }
        ], code: "150000", name: "内蒙古自治区", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "210102", name: "和平区", level: "area" },
                    { code: "210103", name: "沈河区", level: "area" },
                    { code: "210104", name: "大东区", level: "area" },
                    { code: "210105", name: "皇姑区", level: "area" },
                    { code: "210106", name: "铁西区", level: "area" },
                    { code: "210111", name: "苏家屯区", level: "area" },
                    { code: "210112", name: "东陵区", level: "area" },
                    { code: "210113", name: "沈北新区", level: "area" },
                    { code: "210114", name: "于洪区", level: "area" },
                    { code: "210122", name: "辽中县", level: "area" },
                    { code: "210123", name: "康平县", level: "area" },
                    { code: "210124", name: "法库县", level: "area" },
                    { code: "210181", name: "新民市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "210100", name: "沈阳市", level: "city"
            },
            {
                children: [
                    { code: "210202", name: "中山区", level: "area" },
                    { code: "210203", name: "西岗区", level: "area" },
                    { code: "210204", name: "沙河口区", level: "area" },
                    { code: "210211", name: "甘井子区", level: "area" },
                    { code: "210212", name: "旅顺口区", level: "area" },
                    { code: "210213", name: "金州区", level: "area" },
                    { code: "210224", name: "长海县", level: "area" },
                    { code: "210281", name: "瓦房店市", level: "area" },
                    { code: "210282", name: "普兰店市", level: "area" },
                    { code: "210283", name: "庄河市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "210200", name: "大连市", level: "city"
            },
            {
                children: [
                    { code: "210302", name: "铁东区", level: "area" },
                    { code: "210303", name: "铁西区", level: "area" },
                    { code: "210304", name: "立山区", level: "area" },
                    { code: "210311", name: "千山区", level: "area" },
                    { code: "210321", name: "台安县", level: "area" },
                    { code: "210323", name: "岫岩满族自治县", level: "area" },
                    { code: "210381", name: "海城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "210300", name: "鞍山市", level: "city"
            },
            {
                children: [
                    { code: "210402", name: "新抚区", level: "area" },
                    { code: "210403", name: "东洲区", level: "area" },
                    { code: "210404", name: "望花区", level: "area" },
                    { code: "210411", name: "顺城区", level: "area" },
                    { code: "210421", name: "抚顺县", level: "area" },
                    { code: "210422", name: "新宾满族自治县", level: "area" },
                    { code: "210423", name: "清原满族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "210400", name: "抚顺市", level: "city"
            },
            {
                children: [
                    { code: "210502", name: "平山区", level: "area" },
                    { code: "210503", name: "溪湖区", level: "area" },
                    { code: "210504", name: "明山区", level: "area" },
                    { code: "210505", name: "南芬区", level: "area" },
                    { code: "210521", name: "本溪满族自治县", level: "area" },
                    { code: "210522", name: "桓仁满族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "210500", name: "本溪市", level: "city"
            },
            {
                children: [
                    { code: "210602", name: "元宝区", level: "area" },
                    { code: "210603", name: "振兴区", level: "area" },
                    { code: "210604", name: "振安区", level: "area" },
                    { code: "210624", name: "宽甸满族自治县", level: "area" },
                    { code: "210681", name: "东港市", level: "area" },
                    { code: "210682", name: "凤城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "210600", name: "丹东市", level: "city"
            },
            {
                children: [
                    { code: "210702", name: "古塔区", level: "area" },
                    { code: "210703", name: "凌河区", level: "area" },
                    { code: "210711", name: "太和区", level: "area" },
                    { code: "210726", name: "黑山县", level: "area" },
                    { code: "210727", name: "义县", level: "area" },
                    { code: "210781", name: "凌海市", level: "area" },
                    { code: "210782", name: "北镇市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "210700", name: "锦州市", level: "city"
            },
            {
                children: [
                    { code: "210802", name: "站前区", level: "area" },
                    { code: "210803", name: "西市区", level: "area" },
                    { code: "210804", name: "鲅鱼圈区", level: "area" },
                    { code: "210811", name: "老边区", level: "area" },
                    { code: "210881", name: "盖州市", level: "area" },
                    { code: "210882", name: "大石桥市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "210800", name: "营口市", level: "city"
            },
            {
                children: [
                    { code: "210902", name: "海州区", level: "area" },
                    { code: "210903", name: "新邱区", level: "area" },
                    { code: "210904", name: "太平区", level: "area" },
                    { code: "210905", name: "清河门区", level: "area" },
                    { code: "210911", name: "细河区", level: "area" },
                    { code: "210921", name: "阜新蒙古族自治县", level: "area" },
                    { code: "210922", name: "彰武县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "210900", name: "阜新市", level: "city"
            },
            {
                children: [
                    { code: "211002", name: "白塔区", level: "area" },
                    { code: "211003", name: "文圣区", level: "area" },
                    { code: "211004", name: "宏伟区", level: "area" },
                    { code: "211005", name: "弓长岭区", level: "area" },
                    { code: "211011", name: "太子河区", level: "area" },
                    { code: "211021", name: "辽阳县", level: "area" },
                    { code: "211081", name: "灯塔市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "211000", name: "辽阳市", level: "city"
            },
            {
                children: [
                    { code: "211102", name: "双台子区", level: "area" },
                    { code: "211103", name: "兴隆台区", level: "area" },
                    { code: "211121", name: "大洼县", level: "area" },
                    { code: "211122", name: "盘山县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "211100", name: "盘锦市", level: "city"
            },
            {
                children: [
                    { code: "211202", name: "银州区", level: "area" },
                    { code: "211204", name: "清河区", level: "area" },
                    { code: "211221", name: "铁岭县", level: "area" },
                    { code: "211223", name: "西丰县", level: "area" },
                    { code: "211224", name: "昌图县", level: "area" },
                    { code: "211281", name: "调兵山市", level: "area" },
                    { code: "211282", name: "开原市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "211200", name: "铁岭市", level: "city"
            },
            {
                children: [
                    { code: "211302", name: "双塔区", level: "area" },
                    { code: "211303", name: "龙城区", level: "area" },
                    { code: "211321", name: "朝阳县", level: "area" },
                    { code: "211322", name: "建平县", level: "area" },
                    { code: "211324", name: "喀喇沁左翼蒙古族自治县", level: "area" },
                    { code: "211381", name: "北票市", level: "area" },
                    { code: "211382", name: "凌源市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "211300", name: "朝阳市", level: "city"
            },
            {
                children: [
                    { code: "211402", name: "连山区", level: "area" },
                    { code: "211403", name: "龙港区", level: "area" },
                    { code: "211404", name: "南票区", level: "area" },
                    { code: "211421", name: "绥中县", level: "area" },
                    { code: "211422", name: "建昌县", level: "area" },
                    { code: "211481", name: "兴城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "211400", name: "葫芦岛市", level: "city"
            }
        ], code: "210000", name: "辽宁省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "220102", name: "南关区", level: "area" },
                    { code: "220103", name: "宽城区", level: "area" },
                    { code: "220104", name: "朝阳区", level: "area" },
                    { code: "220105", name: "二道区", level: "area" },
                    { code: "220106", name: "绿园区", level: "area" },
                    { code: "220112", name: "双阳区", level: "area" },
                    { code: "220122", name: "农安县", level: "area" },
                    { code: "220181", name: "九台市", level: "area" },
                    { code: "220182", name: "榆树市", level: "area" },
                    { code: "220183", name: "德惠市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "220100", name: "长春市", level: "city"
            },
            {
                children: [
                    { code: "220202", name: "昌邑区", level: "area" },
                    { code: "220203", name: "龙潭区", level: "area" },
                    { code: "220204", name: "船营区", level: "area" },
                    { code: "220211", name: "丰满区", level: "area" },
                    { code: "220221", name: "永吉县", level: "area" },
                    { code: "220281", name: "蛟河市", level: "area" },
                    { code: "220282", name: "桦甸市", level: "area" },
                    { code: "220283", name: "舒兰市", level: "area" },
                    { code: "220284", name: "磐石市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "220200", name: "吉林市", level: "city"
            },
            {
                children: [
                    { code: "220302", name: "铁西区", level: "area" },
                    { code: "220303", name: "铁东区", level: "area" },
                    { code: "220322", name: "梨树县", level: "area" },
                    { code: "220323", name: "伊通满族自治县", level: "area" },
                    { code: "220381", name: "公主岭市", level: "area" },
                    { code: "220382", name: "双辽市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "220300", name: "四平市", level: "city"
            },
            {
                children: [
                    { code: "220402", name: "龙山区", level: "area" },
                    { code: "220403", name: "西安区", level: "area" },
                    { code: "220421", name: "东丰县", level: "area" },
                    { code: "220422", name: "东辽县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "220400", name: "辽源市", level: "city"
            },
            {
                children: [
                    { code: "220502", name: "东昌区", level: "area" },
                    { code: "220503", name: "二道江区", level: "area" },
                    { code: "220521", name: "通化县", level: "area" },
                    { code: "220523", name: "辉南县", level: "area" },
                    { code: "220524", name: "柳河县", level: "area" },
                    { code: "220581", name: "梅河口市", level: "area" },
                    { code: "220582", name: "集安市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "220500", name: "通化市", level: "city"
            },
            {
                children: [
                    { code: "220602", name: "浑江区", level: "area" },
                    { code: "220605", name: "江源区", level: "area" },
                    { code: "220621", name: "抚松县", level: "area" },
                    { code: "220622", name: "靖宇县", level: "area" },
                    { code: "220623", name: "长白朝鲜族自治县", level: "area" },
                    { code: "220681", name: "临江市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "220600", name: "白山市", level: "city"
            },
            {
                children: [
                    { code: "220702", name: "宁江区", level: "area" },
                    { code: "220721", name: "前郭尔罗斯蒙古族自治县", level: "area" },
                    { code: "220722", name: "长岭县", level: "area" },
                    { code: "220723", name: "乾安县", level: "area" },
                    { code: "220781", name: "扶余市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "220700", name: "松原市", level: "city"
            },
            {
                children: [
                    { code: "220802", name: "洮北区", level: "area" },
                    { code: "220821", name: "镇赉县", level: "area" },
                    { code: "220822", name: "通榆县", level: "area" },
                    { code: "220881", name: "洮南市", level: "area" },
                    { code: "220882", name: "大安市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "220800", name: "白城市", level: "city"
            },
            {
                children: [
                    { code: "222401", name: "延吉市", level: "area" },
                    { code: "222402", name: "图们市", level: "area" },
                    { code: "222403", name: "敦化市", level: "area" },
                    { code: "222404", name: "珲春市", level: "area" },
                    { code: "222405", name: "龙井市", level: "area" },
                    { code: "222406", name: "和龙市", level: "area" },
                    { code: "222424", name: "汪清县", level: "area" },
                    { code: "222426", name: "安图县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "222400", name: "延边朝鲜族自治州", level: "city"
            }
        ], code: "220000", name: "吉林省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "230102", name: "道里区", level: "area" },
                    { code: "230103", name: "南岗区", level: "area" },
                    { code: "230104", name: "道外区", level: "area" },
                    { code: "230108", name: "平房区", level: "area" },
                    { code: "230109", name: "松北区", level: "area" },
                    { code: "230110", name: "香坊区", level: "area" },
                    { code: "230111", name: "呼兰区", level: "area" },
                    { code: "230112", name: "阿城区", level: "area" },
                    { code: "230123", name: "依兰县", level: "area" },
                    { code: "230124", name: "方正县", level: "area" },
                    { code: "230125", name: "宾县", level: "area" },
                    { code: "230126", name: "巴彦县", level: "area" },
                    { code: "230127", name: "木兰县", level: "area" },
                    { code: "230128", name: "通河县", level: "area" },
                    { code: "230129", name: "延寿县", level: "area" },
                    { code: "230182", name: "双城市", level: "area" },
                    { code: "230183", name: "尚志市", level: "area" },
                    { code: "230184", name: "五常市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "230100", name: "哈尔滨市", level: "city"
            },
            {
                children: [
                    { code: "230202", name: "龙沙区", level: "area" },
                    { code: "230203", name: "建华区", level: "area" },
                    { code: "230204", name: "铁锋区", level: "area" },
                    { code: "230205", name: "昂昂溪区", level: "area" },
                    { code: "230206", name: "富拉尔基区", level: "area" },
                    { code: "230207", name: "碾子山区", level: "area" },
                    { code: "230208", name: "梅里斯达斡尔族区", level: "area" },
                    { code: "230221", name: "龙江县", level: "area" },
                    { code: "230223", name: "依安县", level: "area" },
                    { code: "230224", name: "泰来县", level: "area" },
                    { code: "230225", name: "甘南县", level: "area" },
                    { code: "230227", name: "富裕县", level: "area" },
                    { code: "230229", name: "克山县", level: "area" },
                    { code: "230230", name: "克东县", level: "area" },
                    { code: "230231", name: "拜泉县", level: "area" },
                    { code: "230281", name: "讷河市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "230200", name: "齐齐哈尔市", level: "city"
            },
            {
                children: [
                    { code: "230302", name: "鸡冠区", level: "area" },
                    { code: "230303", name: "恒山区", level: "area" },
                    { code: "230304", name: "滴道区", level: "area" },
                    { code: "230305", name: "梨树区", level: "area" },
                    { code: "230306", name: "城子河区", level: "area" },
                    { code: "230307", name: "麻山区", level: "area" },
                    { code: "230321", name: "鸡东县", level: "area" },
                    { code: "230381", name: "虎林市", level: "area" },
                    { code: "230382", name: "密山市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "230300", name: "鸡西市", level: "city"
            },
            {
                children: [
                    { code: "230402", name: "向阳区", level: "area" },
                    { code: "230403", name: "工农区", level: "area" },
                    { code: "230404", name: "南山区", level: "area" },
                    { code: "230405", name: "兴安区", level: "area" },
                    { code: "230406", name: "东山区", level: "area" },
                    { code: "230407", name: "兴山区", level: "area" },
                    { code: "230421", name: "萝北县", level: "area" },
                    { code: "230422", name: "绥滨县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "230400", name: "鹤岗市", level: "city"
            },
            {
                children: [
                    { code: "230502", name: "尖山区", level: "area" },
                    { code: "230503", name: "岭东区", level: "area" },
                    { code: "230505", name: "四方台区", level: "area" },
                    { code: "230506", name: "宝山区", level: "area" },
                    { code: "230521", name: "集贤县", level: "area" },
                    { code: "230522", name: "友谊县", level: "area" },
                    { code: "230523", name: "宝清县", level: "area" },
                    { code: "230524", name: "饶河县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "230500", name: "双鸭山市", level: "city"
            },
            {
                children: [
                    { code: "230602", name: "萨尔图区", level: "area" },
                    { code: "230603", name: "龙凤区", level: "area" },
                    { code: "230604", name: "让胡路区", level: "area" },
                    { code: "230605", name: "红岗区", level: "area" },
                    { code: "230606", name: "大同区", level: "area" },
                    { code: "230621", name: "肇州县", level: "area" },
                    { code: "230622", name: "肇源县", level: "area" },
                    { code: "230623", name: "林甸县", level: "area" },
                    { code: "230624", name: "杜尔伯特蒙古族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "230600", name: "大庆市", level: "city"
            },
            {
                children: [
                    { code: "230702", name: "伊春区", level: "area" },
                    { code: "230703", name: "南岔区", level: "area" },
                    { code: "230704", name: "友好区", level: "area" },
                    { code: "230705", name: "西林区", level: "area" },
                    { code: "230706", name: "翠峦区", level: "area" },
                    { code: "230707", name: "新青区", level: "area" },
                    { code: "230708", name: "美溪区", level: "area" },
                    { code: "230709", name: "金山屯区", level: "area" },
                    { code: "230710", name: "五营区", level: "area" },
                    { code: "230711", name: "乌马河区", level: "area" },
                    { code: "230712", name: "汤旺河区", level: "area" },
                    { code: "230713", name: "带岭区", level: "area" },
                    { code: "230714", name: "乌伊岭区", level: "area" },
                    { code: "230715", name: "红星区", level: "area" },
                    { code: "230716", name: "上甘岭区", level: "area" },
                    { code: "230722", name: "嘉荫县", level: "area" },
                    { code: "230781", name: "铁力市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "230700", name: "伊春市", level: "city"
            },
            {
                children: [
                    { code: "230803", name: "向阳区", level: "area" },
                    { code: "230804", name: "前进区", level: "area" },
                    { code: "230805", name: "东风区", level: "area" },
                    { code: "230811", name: "郊区", level: "area" },
                    { code: "230822", name: "桦南县", level: "area" },
                    { code: "230826", name: "桦川县", level: "area" },
                    { code: "230828", name: "汤原县", level: "area" },
                    { code: "230833", name: "抚远县", level: "area" },
                    { code: "230881", name: "同江市", level: "area" },
                    { code: "230882", name: "富锦市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "230800", name: "佳木斯市", level: "city"
            },
            {
                children: [
                    { code: "230902", name: "新兴区", level: "area" },
                    { code: "230903", name: "桃山区", level: "area" },
                    { code: "230904", name: "茄子河区", level: "area" },
                    { code: "230921", name: "勃利县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "230900", name: "七台河市", level: "city"
            },
            {
                children: [
                    { code: "231002", name: "东安区", level: "area" },
                    { code: "231003", name: "阳明区", level: "area" },
                    { code: "231004", name: "爱民区", level: "area" },
                    { code: "231005", name: "西安区", level: "area" },
                    { code: "231024", name: "东宁县", level: "area" },
                    { code: "231025", name: "林口县", level: "area" },
                    { code: "231081", name: "绥芬河市", level: "area" },
                    { code: "231083", name: "海林市", level: "area" },
                    { code: "231084", name: "宁安市", level: "area" },
                    { code: "231085", name: "穆棱市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "231000", name: "牡丹江市", level: "city"
            },
            {
                children: [
                    { code: "231102", name: "爱辉区", level: "area" },
                    { code: "231121", name: "嫩江县", level: "area" },
                    { code: "231123", name: "逊克县", level: "area" },
                    { code: "231124", name: "孙吴县", level: "area" },
                    { code: "231181", name: "北安市", level: "area" },
                    { code: "231182", name: "五大连池市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "231100", name: "黑河市", level: "city"
            },
            {
                children: [
                    { code: "231202", name: "北林区", level: "area" },
                    { code: "231221", name: "望奎县", level: "area" },
                    { code: "231222", name: "兰西县", level: "area" },
                    { code: "231223", name: "青冈县", level: "area" },
                    { code: "231224", name: "庆安县", level: "area" },
                    { code: "231225", name: "明水县", level: "area" },
                    { code: "231226", name: "绥棱县", level: "area" },
                    { code: "231281", name: "安达市", level: "area" },
                    { code: "231282", name: "肇东市", level: "area" },
                    { code: "231283", name: "海伦市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "231200", name: "绥化市", level: "city"
            },
            {
                children: [
                    { code: "232721", name: "呼玛县", level: "area" },
                    { code: "232722", name: "塔河县", level: "area" },
                    { code: "232723", name: "漠河县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "232700", name: "大兴安岭地区", level: "city"
            }
        ], code: "230000", name: "黑龙江省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "310101", name: "黄浦区", level: "area" },
                    { code: "310104", name: "徐汇区", level: "area" },
                    { code: "310105", name: "长宁区", level: "area" },
                    { code: "310106", name: "静安区", level: "area" },
                    { code: "310107", name: "普陀区", level: "area" },
                    { code: "310108", name: "闸北区", level: "area" },
                    { code: "310109", name: "虹口区", level: "area" },
                    { code: "310110", name: "杨浦区", level: "area" },
                    { code: "310112", name: "闵行区", level: "area" },
                    { code: "310113", name: "宝山区", level: "area" },
                    { code: "310114", name: "嘉定区", level: "area" },
                    { code: "310115", name: "浦东新区", level: "area" },
                    { code: "310116", name: "金山区", level: "area" },
                    { code: "310117", name: "松江区", level: "area" },
                    { code: "310118", name: "青浦区", level: "area" },
                    { code: "310120", name: "奉贤区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "310100", name: "上海市", level: "city"
            },
            {
                children: [
                    { code: "310230", name: "崇明县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "310200", name: "县", level: "city"
            }
        ], code: "310000", name: "上海市", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "320102", name: "玄武区", level: "area" },
                    { code: "320104", name: "秦淮区", level: "area" },
                    { code: "320105", name: "建邺区", level: "area" },
                    { code: "320106", name: "鼓楼区", level: "area" },
                    { code: "320111", name: "浦口区", level: "area" },
                    { code: "320113", name: "栖霞区", level: "area" },
                    { code: "320114", name: "雨花台区", level: "area" },
                    { code: "320115", name: "江宁区", level: "area" },
                    { code: "320116", name: "六合区", level: "area" },
                    { code: "320117", name: "溧水区", level: "area" },
                    { code: "320118", name: "高淳区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "320100", name: "南京市", level: "city"
            },
            {
                children: [
                    { code: "320202", name: "崇安区", level: "area" },
                    { code: "320203", name: "南长区", level: "area" },
                    { code: "320204", name: "北塘区", level: "area" },
                    { code: "320205", name: "锡山区", level: "area" },
                    { code: "320206", name: "惠山区", level: "area" },
                    { code: "320211", name: "滨湖区", level: "area" },
                    { code: "320281", name: "江阴市", level: "area" },
                    { code: "320282", name: "宜兴市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "320200", name: "无锡市", level: "city"
            },
            {
                children: [
                    { code: "320302", name: "鼓楼区", level: "area" },
                    { code: "320303", name: "云龙区", level: "area" },
                    { code: "320305", name: "贾汪区", level: "area" },
                    { code: "320311", name: "泉山区", level: "area" },
                    { code: "320312", name: "铜山区", level: "area" },
                    { code: "320321", name: "丰县", level: "area" },
                    { code: "320322", name: "沛县", level: "area" },
                    { code: "320324", name: "睢宁县", level: "area" },
                    { code: "320381", name: "新沂市", level: "area" },
                    { code: "320382", name: "邳州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "320300", name: "徐州市", level: "city"
            },
            {
                children: [
                    { code: "320402", name: "天宁区", level: "area" },
                    { code: "320404", name: "钟楼区", level: "area" },
                    { code: "320405", name: "戚墅堰区", level: "area" },
                    { code: "320411", name: "新北区", level: "area" },
                    { code: "320412", name: "武进区", level: "area" },
                    { code: "320481", name: "溧阳市", level: "area" },
                    { code: "320482", name: "金坛市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "320400", name: "常州市", level: "city"
            },
            {
                children: [
                    { code: "320505", name: "虎丘区", level: "area" },
                    { code: "320506", name: "吴中区", level: "area" },
                    { code: "320507", name: "相城区", level: "area" },
                    { code: "320508", name: "姑苏区", level: "area" },
                    { code: "320509", name: "吴江区", level: "area" },
                    { code: "320581", name: "常熟市", level: "area" },
                    { code: "320582", name: "张家港市", level: "area" },
                    { code: "320583", name: "昆山市", level: "area" },
                    { code: "320585", name: "太仓市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "320500", name: "苏州市", level: "city"
            },
            {
                children: [
                    { code: "320602", name: "崇川区", level: "area" },
                    { code: "320611", name: "港闸区", level: "area" },
                    { code: "320612", name: "通州区", level: "area" },
                    { code: "320621", name: "海安县", level: "area" },
                    { code: "320623", name: "如东县", level: "area" },
                    { code: "320681", name: "启东市", level: "area" },
                    { code: "320682", name: "如皋市", level: "area" },
                    { code: "320684", name: "海门市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "320600", name: "南通市", level: "city"
            },
            {
                children: [
                    { code: "320703", name: "连云区", level: "area" },
                    { code: "320705", name: "新浦区", level: "area" },
                    { code: "320706", name: "海州区", level: "area" },
                    { code: "320721", name: "赣榆县", level: "area" },
                    { code: "320722", name: "东海县", level: "area" },
                    { code: "320723", name: "灌云县", level: "area" },
                    { code: "320724", name: "灌南县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "320700", name: "连云港市", level: "city"
            },
            {
                children: [
                    { code: "320802", name: "清河区", level: "area" },
                    { code: "320803", name: "淮安区", level: "area" },
                    { code: "320804", name: "淮阴区", level: "area" },
                    { code: "320811", name: "清浦区", level: "area" },
                    { code: "320826", name: "涟水县", level: "area" },
                    { code: "320829", name: "洪泽县", level: "area" },
                    { code: "320830", name: "盱眙县", level: "area" },
                    { code: "320831", name: "金湖县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "320800", name: "淮安市", level: "city"
            },
            {
                children: [
                    { code: "320902", name: "亭湖区", level: "area" },
                    { code: "320903", name: "盐都区", level: "area" },
                    { code: "320921", name: "响水县", level: "area" },
                    { code: "320922", name: "滨海县", level: "area" },
                    { code: "320923", name: "阜宁县", level: "area" },
                    { code: "320924", name: "射阳县", level: "area" },
                    { code: "320925", name: "建湖县", level: "area" },
                    { code: "320981", name: "东台市", level: "area" },
                    { code: "320982", name: "大丰市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "320900", name: "盐城市", level: "city"
            },
            {
                children: [
                    { code: "321002", name: "广陵区", level: "area" },
                    { code: "321003", name: "邗江区", level: "area" },
                    { code: "321012", name: "江都区", level: "area" },
                    { code: "321023", name: "宝应县", level: "area" },
                    { code: "321081", name: "仪征市", level: "area" },
                    { code: "321084", name: "高邮市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "321000", name: "扬州市", level: "city"
            },
            {
                children: [
                    { code: "321102", name: "京口区", level: "area" },
                    { code: "321111", name: "润州区", level: "area" },
                    { code: "321112", name: "丹徒区", level: "area" },
                    { code: "321181", name: "丹阳市", level: "area" },
                    { code: "321182", name: "扬中市", level: "area" },
                    { code: "321183", name: "句容市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "321100", name: "镇江市", level: "city"
            },
            {
                children: [
                    { code: "321202", name: "海陵区", level: "area" },
                    { code: "321203", name: "高港区", level: "area" },
                    { code: "321204", name: "姜堰区", level: "area" },
                    { code: "321281", name: "兴化市", level: "area" },
                    { code: "321282", name: "靖江市", level: "area" },
                    { code: "321283", name: "泰兴市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "321200", name: "泰州市", level: "city"
            },
            {
                children: [
                    { code: "321302", name: "宿城区", level: "area" },
                    { code: "321311", name: "宿豫区", level: "area" },
                    { code: "321322", name: "沭阳县", level: "area" },
                    { code: "321323", name: "泗阳县", level: "area" },
                    { code: "321324", name: "泗洪县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "321300", name: "宿迁市", level: "city"
            }
        ], code: "320000", name: "江苏省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "330102", name: "上城区", level: "area" },
                    { code: "330103", name: "下城区", level: "area" },
                    { code: "330104", name: "江干区", level: "area" },
                    { code: "330105", name: "拱墅区", level: "area" },
                    { code: "330106", name: "西湖区", level: "area" },
                    { code: "330108", name: "滨江区", level: "area" },
                    { code: "330109", name: "萧山区", level: "area" },
                    { code: "330110", name: "余杭区", level: "area" },
                    { code: "330122", name: "桐庐县", level: "area" },
                    { code: "330127", name: "淳安县", level: "area" },
                    { code: "330182", name: "建德市", level: "area" },
                    { code: "330183", name: "富阳市", level: "area" },
                    { code: "330185", name: "临安市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "330100", name: "杭州市", level: "city"
            },
            {
                children: [
                    { code: "330203", name: "海曙区", level: "area" },
                    { code: "330204", name: "江东区", level: "area" },
                    { code: "330205", name: "江北区", level: "area" },
                    { code: "330206", name: "北仑区", level: "area" },
                    { code: "330211", name: "镇海区", level: "area" },
                    { code: "330212", name: "鄞州区", level: "area" },
                    { code: "330225", name: "象山县", level: "area" },
                    { code: "330226", name: "宁海县", level: "area" },
                    { code: "330281", name: "余姚市", level: "area" },
                    { code: "330282", name: "慈溪市", level: "area" },
                    { code: "330283", name: "奉化市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "330200", name: "宁波市", level: "city"
            },
            {
                children: [
                    { code: "330302", name: "鹿城区", level: "area" },
                    { code: "330303", name: "龙湾区", level: "area" },
                    { code: "330304", name: "瓯海区", level: "area" },
                    { code: "330322", name: "洞头县", level: "area" },
                    { code: "330324", name: "永嘉县", level: "area" },
                    { code: "330326", name: "平阳县", level: "area" },
                    { code: "330327", name: "苍南县", level: "area" },
                    { code: "330328", name: "文成县", level: "area" },
                    { code: "330329", name: "泰顺县", level: "area" },
                    { code: "330381", name: "瑞安市", level: "area" },
                    { code: "330382", name: "乐清市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "330300", name: "温州市", level: "city"
            },
            {
                children: [
                    { code: "330402", name: "南湖区", level: "area" },
                    { code: "330411", name: "秀洲区", level: "area" },
                    { code: "330421", name: "嘉善县", level: "area" },
                    { code: "330424", name: "海盐县", level: "area" },
                    { code: "330481", name: "海宁市", level: "area" },
                    { code: "330482", name: "平湖市", level: "area" },
                    { code: "330483", name: "桐乡市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "330400", name: "嘉兴市", level: "city"
            },
            {
                children: [
                    { code: "330502", name: "吴兴区", level: "area" },
                    { code: "330503", name: "南浔区", level: "area" },
                    { code: "330521", name: "德清县", level: "area" },
                    { code: "330522", name: "长兴县", level: "area" },
                    { code: "330523", name: "安吉县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "330500", name: "湖州市", level: "city"
            },
            {
                children: [
                    { code: "330602", name: "越城区", level: "area" },
                    { code: "330621", name: "绍兴县", level: "area" },
                    { code: "330624", name: "新昌县", level: "area" },
                    { code: "330681", name: "诸暨市", level: "area" },
                    { code: "330682", name: "上虞市", level: "area" },
                    { code: "330683", name: "嵊州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "330600", name: "绍兴市", level: "city"
            },
            {
                children: [
                    { code: "330702", name: "婺城区", level: "area" },
                    { code: "330703", name: "金东区", level: "area" },
                    { code: "330723", name: "武义县", level: "area" },
                    { code: "330726", name: "浦江县", level: "area" },
                    { code: "330727", name: "磐安县", level: "area" },
                    { code: "330781", name: "兰溪市", level: "area" },
                    { code: "330782", name: "义乌市", level: "area" },
                    { code: "330783", name: "东阳市", level: "area" },
                    { code: "330784", name: "永康市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "330700", name: "金华市", level: "city"
            },
            {
                children: [
                    { code: "330802", name: "柯城区", level: "area" },
                    { code: "330803", name: "衢江区", level: "area" },
                    { code: "330822", name: "常山县", level: "area" },
                    { code: "330824", name: "开化县", level: "area" },
                    { code: "330825", name: "龙游县", level: "area" },
                    { code: "330881", name: "江山市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "330800", name: "衢州市", level: "city"
            },
            {
                children: [
                    { code: "330902", name: "定海区", level: "area" },
                    { code: "330903", name: "普陀区", level: "area" },
                    { code: "330921", name: "岱山县", level: "area" },
                    { code: "330922", name: "嵊泗县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "330900", name: "舟山市", level: "city"
            },
            {
                children: [
                    { code: "331002", name: "椒江区", level: "area" },
                    { code: "331003", name: "黄岩区", level: "area" },
                    { code: "331004", name: "路桥区", level: "area" },
                    { code: "331021", name: "玉环县", level: "area" },
                    { code: "331022", name: "三门县", level: "area" },
                    { code: "331023", name: "天台县", level: "area" },
                    { code: "331024", name: "仙居县", level: "area" },
                    { code: "331081", name: "温岭市", level: "area" },
                    { code: "331082", name: "临海市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "331000", name: "台州市", level: "city"
            },
            {
                children: [
                    { code: "331102", name: "莲都区", level: "area" },
                    { code: "331121", name: "青田县", level: "area" },
                    { code: "331122", name: "缙云县", level: "area" },
                    { code: "331123", name: "遂昌县", level: "area" },
                    { code: "331124", name: "松阳县", level: "area" },
                    { code: "331125", name: "云和县", level: "area" },
                    { code: "331126", name: "庆元县", level: "area" },
                    { code: "331127", name: "景宁畲族自治县", level: "area" },
                    { code: "331181", name: "龙泉市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "331100", name: "丽水市", level: "city"
            }
        ], code: "330000", name: "浙江省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "340102", name: "瑶海区", level: "area" },
                    { code: "340103", name: "庐阳区", level: "area" },
                    { code: "340104", name: "蜀山区", level: "area" },
                    { code: "340111", name: "包河区", level: "area" },
                    { code: "340121", name: "长丰县", level: "area" },
                    { code: "340122", name: "肥东县", level: "area" },
                    { code: "340123", name: "肥西县", level: "area" },
                    { code: "340124", name: "庐江县", level: "area" },
                    { code: "340181", name: "巢湖市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "340100", name: "合肥市", level: "city"
            },
            {
                children: [
                    { code: "340202", name: "镜湖区", level: "area" },
                    { code: "340203", name: "弋江区", level: "area" },
                    { code: "340207", name: "鸠江区", level: "area" },
                    { code: "340208", name: "三山区", level: "area" },
                    { code: "340221", name: "芜湖县", level: "area" },
                    { code: "340222", name: "繁昌县", level: "area" },
                    { code: "340223", name: "南陵县", level: "area" },
                    { code: "340225", name: "无为县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "340200", name: "芜湖市", level: "city"
            },
            {
                children: [
                    { code: "340302", name: "龙子湖区", level: "area" },
                    { code: "340303", name: "蚌山区", level: "area" },
                    { code: "340304", name: "禹会区", level: "area" },
                    { code: "340311", name: "淮上区", level: "area" },
                    { code: "340321", name: "怀远县", level: "area" },
                    { code: "340322", name: "五河县", level: "area" },
                    { code: "340323", name: "固镇县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "340300", name: "蚌埠市", level: "city"
            },
            {
                children: [
                    { code: "340402", name: "大通区", level: "area" },
                    { code: "340403", name: "田家庵区", level: "area" },
                    { code: "340404", name: "谢家集区", level: "area" },
                    { code: "340405", name: "八公山区", level: "area" },
                    { code: "340406", name: "潘集区", level: "area" },
                    { code: "340421", name: "凤台县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "340400", name: "淮南市", level: "city"
            },
            {
                children: [
                    { code: "340503", name: "花山区", level: "area" },
                    { code: "340504", name: "雨山区", level: "area" },
                    { code: "340506", name: "博望区", level: "area" },
                    { code: "340521", name: "当涂县", level: "area" },
                    { code: "340522", name: "含山县", level: "area" },
                    { code: "340523", name: "和县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "340500", name: "马鞍山市", level: "city"
            },
            {
                children: [
                    { code: "340602", name: "杜集区", level: "area" },
                    { code: "340603", name: "相山区", level: "area" },
                    { code: "340604", name: "烈山区", level: "area" },
                    { code: "340621", name: "濉溪县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "340600", name: "淮北市", level: "city"
            },
            {
                children: [
                    { code: "340702", name: "铜官山区", level: "area" },
                    { code: "340703", name: "狮子山区", level: "area" },
                    { code: "340711", name: "郊区", level: "area" },
                    { code: "340721", name: "铜陵县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "340700", name: "铜陵市", level: "city"
            },
            {
                children: [
                    { code: "340802", name: "迎江区", level: "area" },
                    { code: "340803", name: "大观区", level: "area" },
                    { code: "340811", name: "宜秀区", level: "area" },
                    { code: "340822", name: "怀宁县", level: "area" },
                    { code: "340823", name: "枞阳县", level: "area" },
                    { code: "340824", name: "潜山县", level: "area" },
                    { code: "340825", name: "太湖县", level: "area" },
                    { code: "340826", name: "宿松县", level: "area" },
                    { code: "340827", name: "望江县", level: "area" },
                    { code: "340828", name: "岳西县", level: "area" },
                    { code: "340881", name: "桐城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "340800", name: "安庆市", level: "city"
            },
            {
                children: [
                    { code: "341002", name: "屯溪区", level: "area" },
                    { code: "341003", name: "黄山区", level: "area" },
                    { code: "341004", name: "徽州区", level: "area" },
                    { code: "341021", name: "歙县", level: "area" },
                    { code: "341022", name: "休宁县", level: "area" },
                    { code: "341023", name: "黟县", level: "area" },
                    { code: "341024", name: "祁门县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "341000", name: "黄山市", level: "city"
            },
            {
                children: [
                    { code: "341102", name: "琅琊区", level: "area" },
                    { code: "341103", name: "南谯区", level: "area" },
                    { code: "341122", name: "来安县", level: "area" },
                    { code: "341124", name: "全椒县", level: "area" },
                    { code: "341125", name: "定远县", level: "area" },
                    { code: "341126", name: "凤阳县", level: "area" },
                    { code: "341181", name: "天长市", level: "area" },
                    { code: "341182", name: "明光市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "341100", name: "滁州市", level: "city"
            },
            {
                children: [
                    { code: "341202", name: "颍州区", level: "area" },
                    { code: "341203", name: "颍东区", level: "area" },
                    { code: "341204", name: "颍泉区", level: "area" },
                    { code: "341221", name: "临泉县", level: "area" },
                    { code: "341222", name: "太和县", level: "area" },
                    { code: "341225", name: "阜南县", level: "area" },
                    { code: "341226", name: "颍上县", level: "area" },
                    { code: "341282", name: "界首市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "341200", name: "阜阳市", level: "city"
            },
            {
                children: [
                    { code: "341302", name: "埇桥区", level: "area" },
                    { code: "341321", name: "砀山县", level: "area" },
                    { code: "341322", name: "萧县", level: "area" },
                    { code: "341323", name: "灵璧县", level: "area" },
                    { code: "341324", name: "泗县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "341300", name: "宿州市", level: "city"
            },
            {
                children: [
                    { code: "341502", name: "金安区", level: "area" },
                    { code: "341503", name: "裕安区", level: "area" },
                    { code: "341521", name: "寿县", level: "area" },
                    { code: "341522", name: "霍邱县", level: "area" },
                    { code: "341523", name: "舒城县", level: "area" },
                    { code: "341524", name: "金寨县", level: "area" },
                    { code: "341525", name: "霍山县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "341500", name: "六安市", level: "city"
            },
            {
                children: [
                    { code: "341602", name: "谯城区", level: "area" },
                    { code: "341621", name: "涡阳县", level: "area" },
                    { code: "341622", name: "蒙城县", level: "area" },
                    { code: "341623", name: "利辛县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "341600", name: "亳州市", level: "city"
            },
            {
                children: [
                    { code: "341702", name: "贵池区", level: "area" },
                    { code: "341721", name: "东至县", level: "area" },
                    { code: "341722", name: "石台县", level: "area" },
                    { code: "341723", name: "青阳县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "341700", name: "池州市", level: "city"
            },
            {
                children: [
                    { code: "341802", name: "宣州区", level: "area" },
                    { code: "341821", name: "郎溪县", level: "area" },
                    { code: "341822", name: "广德县", level: "area" },
                    { code: "341823", name: "泾县", level: "area" },
                    { code: "341824", name: "绩溪县", level: "area" },
                    { code: "341825", name: "旌德县", level: "area" },
                    { code: "341881", name: "宁国市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "341800", name: "宣城市", level: "city"
            }
        ], code: "340000", name: "安徽省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "350102", name: "鼓楼区", level: "area" },
                    { code: "350103", name: "台江区", level: "area" },
                    { code: "350104", name: "仓山区", level: "area" },
                    { code: "350105", name: "马尾区", level: "area" },
                    { code: "350111", name: "晋安区", level: "area" },
                    { code: "350121", name: "闽侯县", level: "area" },
                    { code: "350122", name: "连江县", level: "area" },
                    { code: "350123", name: "罗源县", level: "area" },
                    { code: "350124", name: "闽清县", level: "area" },
                    { code: "350125", name: "永泰县", level: "area" },
                    { code: "350128", name: "平潭县", level: "area" },
                    { code: "350181", name: "福清市", level: "area" },
                    { code: "350182", name: "长乐市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "350100", name: "福州市", level: "city"
            },
            {
                children: [
                    { code: "350203", name: "思明区", level: "area" },
                    { code: "350205", name: "海沧区", level: "area" },
                    { code: "350206", name: "湖里区", level: "area" },
                    { code: "350211", name: "集美区", level: "area" },
                    { code: "350212", name: "同安区", level: "area" },
                    { code: "350213", name: "翔安区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "350200", name: "厦门市", level: "city"
            },
            {
                children: [
                    { code: "350302", name: "城厢区", level: "area" },
                    { code: "350303", name: "涵江区", level: "area" },
                    { code: "350304", name: "荔城区", level: "area" },
                    { code: "350305", name: "秀屿区", level: "area" },
                    { code: "350322", name: "仙游县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "350300", name: "莆田市", level: "city"
            },
            {
                children: [
                    { code: "350402", name: "梅列区", level: "area" },
                    { code: "350403", name: "三元区", level: "area" },
                    { code: "350421", name: "明溪县", level: "area" },
                    { code: "350423", name: "清流县", level: "area" },
                    { code: "350424", name: "宁化县", level: "area" },
                    { code: "350425", name: "大田县", level: "area" },
                    { code: "350426", name: "尤溪县", level: "area" },
                    { code: "350427", name: "沙县", level: "area" },
                    { code: "350428", name: "将乐县", level: "area" },
                    { code: "350429", name: "泰宁县", level: "area" },
                    { code: "350430", name: "建宁县", level: "area" },
                    { code: "350481", name: "永安市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "350400", name: "三明市", level: "city"
            },
            {
                children: [
                    { code: "350502", name: "鲤城区", level: "area" },
                    { code: "350503", name: "丰泽区", level: "area" },
                    { code: "350504", name: "洛江区", level: "area" },
                    { code: "350505", name: "泉港区", level: "area" },
                    { code: "350521", name: "惠安县", level: "area" },
                    { code: "350524", name: "安溪县", level: "area" },
                    { code: "350525", name: "永春县", level: "area" },
                    { code: "350526", name: "德化县", level: "area" },
                    { code: "350527", name: "金门县", level: "area" },
                    { code: "350581", name: "石狮市", level: "area" },
                    { code: "350582", name: "晋江市", level: "area" },
                    { code: "350583", name: "南安市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "350500", name: "泉州市", level: "city"
            },
            {
                children: [
                    { code: "350602", name: "芗城区", level: "area" },
                    { code: "350603", name: "龙文区", level: "area" },
                    { code: "350622", name: "云霄县", level: "area" },
                    { code: "350623", name: "漳浦县", level: "area" },
                    { code: "350624", name: "诏安县", level: "area" },
                    { code: "350625", name: "长泰县", level: "area" },
                    { code: "350626", name: "东山县", level: "area" },
                    { code: "350627", name: "南靖县", level: "area" },
                    { code: "350628", name: "平和县", level: "area" },
                    { code: "350629", name: "华安县", level: "area" },
                    { code: "350681", name: "龙海市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "350600", name: "漳州市", level: "city"
            },
            {
                children: [
                    { code: "350702", name: "延平区", level: "area" },
                    { code: "350721", name: "顺昌县", level: "area" },
                    { code: "350722", name: "浦城县", level: "area" },
                    { code: "350723", name: "光泽县", level: "area" },
                    { code: "350724", name: "松溪县", level: "area" },
                    { code: "350725", name: "政和县", level: "area" },
                    { code: "350781", name: "邵武市", level: "area" },
                    { code: "350782", name: "武夷山市", level: "area" },
                    { code: "350783", name: "建瓯市", level: "area" },
                    { code: "350784", name: "建阳市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "350700", name: "南平市", level: "city"
            },
            {
                children: [
                    { code: "350802", name: "新罗区", level: "area" },
                    { code: "350821", name: "长汀县", level: "area" },
                    { code: "350822", name: "永定县", level: "area" },
                    { code: "350823", name: "上杭县", level: "area" },
                    { code: "350824", name: "武平县", level: "area" },
                    { code: "350825", name: "连城县", level: "area" },
                    { code: "350881", name: "漳平市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "350800", name: "龙岩市", level: "city"
            },
            {
                children: [
                    { code: "350902", name: "蕉城区", level: "area" },
                    { code: "350921", name: "霞浦县", level: "area" },
                    { code: "350922", name: "古田县", level: "area" },
                    { code: "350923", name: "屏南县", level: "area" },
                    { code: "350924", name: "寿宁县", level: "area" },
                    { code: "350925", name: "周宁县", level: "area" },
                    { code: "350926", name: "柘荣县", level: "area" },
                    { code: "350981", name: "福安市", level: "area" },
                    { code: "350982", name: "福鼎市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "350900", name: "宁德市", level: "city"
            }
        ], code: "350000", name: "福建省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "360102", name: "东湖区", level: "area" },
                    { code: "360103", name: "西湖区", level: "area" },
                    { code: "360104", name: "青云谱区", level: "area" },
                    { code: "360105", name: "湾里区", level: "area" },
                    { code: "360111", name: "青山湖区", level: "area" },
                    { code: "360121", name: "南昌县", level: "area" },
                    { code: "360122", name: "新建县", level: "area" },
                    { code: "360123", name: "安义县", level: "area" },
                    { code: "360124", name: "进贤县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "360100", name: "南昌市", level: "city"
            },
            {
                children: [
                    { code: "360202", name: "昌江区", level: "area" },
                    { code: "360203", name: "珠山区", level: "area" },
                    { code: "360222", name: "浮梁县", level: "area" },
                    { code: "360281", name: "乐平市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "360200", name: "景德镇市", level: "city"
            },
            {
                children: [
                    { code: "360302", name: "安源区", level: "area" },
                    { code: "360313", name: "湘东区", level: "area" },
                    { code: "360321", name: "莲花县", level: "area" },
                    { code: "360322", name: "上栗县", level: "area" },
                    { code: "360323", name: "芦溪县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "360300", name: "萍乡市", level: "city"
            },
            {
                children: [
                    { code: "360402", name: "庐山区", level: "area" },
                    { code: "360403", name: "浔阳区", level: "area" },
                    { code: "360421", name: "九江县", level: "area" },
                    { code: "360423", name: "武宁县", level: "area" },
                    { code: "360424", name: "修水县", level: "area" },
                    { code: "360425", name: "永修县", level: "area" },
                    { code: "360426", name: "德安县", level: "area" },
                    { code: "360427", name: "星子县", level: "area" },
                    { code: "360428", name: "都昌县", level: "area" },
                    { code: "360429", name: "湖口县", level: "area" },
                    { code: "360430", name: "彭泽县", level: "area" },
                    { code: "360481", name: "瑞昌市", level: "area" },
                    { code: "360482", name: "共青城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "360400", name: "九江市", level: "city"
            },
            {
                children: [
                    { code: "360502", name: "渝水区", level: "area" },
                    { code: "360521", name: "分宜县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "360500", name: "新余市", level: "city"
            },
            {
                children: [
                    { code: "360602", name: "月湖区", level: "area" },
                    { code: "360622", name: "余江县", level: "area" },
                    { code: "360681", name: "贵溪市", level: "area" },
                    { code: "360682", name: "龙虎山风景旅游区", level: "area" },
                ], code: "360600", name: "鹰潭市", level: "city"
            },
            {
                children: [
                    { code: "360702", name: "章贡区", level: "area" },
                    { code: "360721", name: "赣县", level: "area" },
                    { code: "360722", name: "信丰县", level: "area" },
                    { code: "360723", name: "大余县", level: "area" },
                    { code: "360724", name: "上犹县", level: "area" },
                    { code: "360725", name: "崇义县", level: "area" },
                    { code: "360726", name: "安远县", level: "area" },
                    { code: "360727", name: "龙南县", level: "area" },
                    { code: "360728", name: "定南县", level: "area" },
                    { code: "360729", name: "全南县", level: "area" },
                    { code: "360730", name: "宁都县", level: "area" },
                    { code: "360731", name: "于都县", level: "area" },
                    { code: "360732", name: "兴国县", level: "area" },
                    { code: "360733", name: "会昌县", level: "area" },
                    { code: "360734", name: "寻乌县", level: "area" },
                    { code: "360735", name: "石城县", level: "area" },
                    { code: "360781", name: "瑞金市", level: "area" },
                    { code: "360782", name: "南康市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "360700", name: "赣州市", level: "city"
            },
            {
                children: [
                    { code: "360802", name: "吉州区", level: "area" },
                    { code: "360803", name: "青原区", level: "area" },
                    { code: "360821", name: "吉安县", level: "area" },
                    { code: "360822", name: "吉水县", level: "area" },
                    { code: "360823", name: "峡江县", level: "area" },
                    { code: "360824", name: "新干县", level: "area" },
                    { code: "360825", name: "永丰县", level: "area" },
                    { code: "360826", name: "泰和县", level: "area" },
                    { code: "360827", name: "遂川县", level: "area" },
                    { code: "360828", name: "万安县", level: "area" },
                    { code: "360829", name: "安福县", level: "area" },
                    { code: "360830", name: "永新县", level: "area" },
                    { code: "360881", name: "井冈山市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "360800", name: "吉安市", level: "city"
            },
            {
                children: [
                    { code: "360902", name: "袁州区", level: "area" },
                    { code: "360921", name: "奉新县", level: "area" },
                    { code: "360922", name: "万载县", level: "area" },
                    { code: "360923", name: "上高县", level: "area" },
                    { code: "360924", name: "宜丰县", level: "area" },
                    { code: "360925", name: "靖安县", level: "area" },
                    { code: "360926", name: "铜鼓县", level: "area" },
                    { code: "360981", name: "丰城市", level: "area" },
                    { code: "360982", name: "樟树市", level: "area" },
                    { code: "360983", name: "高安市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "360900", name: "宜春市", level: "city"
            },
            {
                children: [
                    { code: "361002", name: "临川区", level: "area" },
                    { code: "361021", name: "南城县", level: "area" },
                    { code: "361022", name: "黎川县", level: "area" },
                    { code: "361023", name: "南丰县", level: "area" },
                    { code: "361024", name: "崇仁县", level: "area" },
                    { code: "361025", name: "乐安县", level: "area" },
                    { code: "361026", name: "宜黄县", level: "area" },
                    { code: "361027", name: "金溪县", level: "area" },
                    { code: "361028", name: "资溪县", level: "area" },
                    { code: "361029", name: "东乡县", level: "area" },
                    { code: "361030", name: "广昌县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "361000", name: "抚州市", level: "city"
            },
            {
                children: [
                    { code: "361102", name: "信州区", level: "area" },
                    { code: "361121", name: "上饶县", level: "area" },
                    { code: "361122", name: "广丰县", level: "area" },
                    { code: "361123", name: "玉山县", level: "area" },
                    { code: "361124", name: "铅山县", level: "area" },
                    { code: "361125", name: "横峰县", level: "area" },
                    { code: "361126", name: "弋阳县", level: "area" },
                    { code: "361127", name: "余干县", level: "area" },
                    { code: "361128", name: "鄱阳县", level: "area" },
                    { code: "361129", name: "万年县", level: "area" },
                    { code: "361130", name: "婺源县", level: "area" },
                    { code: "361181", name: "德兴市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "361100", name: "上饶市", level: "city"
            }
        ], code: "360000", name: "江西省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "370102", name: "历下区", level: "area" },
                    { code: "370103", name: "市中区", level: "area" },
                    { code: "370104", name: "槐荫区", level: "area" },
                    { code: "370105", name: "天桥区", level: "area" },
                    { code: "370112", name: "历城区", level: "area" },
                    { code: "370113", name: "长清区", level: "area" },
                    { code: "370124", name: "平阴县", level: "area" },
                    { code: "370125", name: "济阳县", level: "area" },
                    { code: "370126", name: "商河县", level: "area" },
                    { code: "370181", name: "章丘市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "370100", name: "济南市", level: "city"
            },
            {
                children: [
                    { code: "370202", name: "市南区", level: "area" },
                    { code: "370203", name: "市北区", level: "area" },
                    { code: "370211", name: "黄岛区", level: "area" },
                    { code: "370212", name: "崂山区", level: "area" },
                    { code: "370213", name: "李沧区", level: "area" },
                    { code: "370214", name: "城阳区", level: "area" },
                    { code: "370281", name: "胶州市", level: "area" },
                    { code: "370282", name: "即墨市", level: "area" },
                    { code: "370283", name: "平度市", level: "area" },
                    { code: "370285", name: "莱西市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "370200", name: "青岛市", level: "city"
            },
            {
                children: [
                    { code: "370302", name: "淄川区", level: "area" },
                    { code: "370303", name: "张店区", level: "area" },
                    { code: "370304", name: "博山区", level: "area" },
                    { code: "370305", name: "临淄区", level: "area" },
                    { code: "370306", name: "周村区", level: "area" },
                    { code: "370321", name: "桓台县", level: "area" },
                    { code: "370322", name: "高青县", level: "area" },
                    { code: "370323", name: "沂源县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "370300", name: "淄博市", level: "city"
            },
            {
                children: [
                    { code: "370402", name: "市中区", level: "area" },
                    { code: "370403", name: "薛城区", level: "area" },
                    { code: "370404", name: "峄城区", level: "area" },
                    { code: "370405", name: "台儿庄区", level: "area" },
                    { code: "370406", name: "山亭区", level: "area" },
                    { code: "370481", name: "滕州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "370400", name: "枣庄市", level: "city"
            },
            {
                children: [
                    { code: "370502", name: "东营区", level: "area" },
                    { code: "370503", name: "河口区", level: "area" },
                    { code: "370521", name: "垦利县", level: "area" },
                    { code: "370522", name: "利津县", level: "area" },
                    { code: "370523", name: "广饶县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "370500", name: "东营市", level: "city"
            },
            {
                children: [
                    { code: "370602", name: "芝罘区", level: "area" },
                    { code: "370611", name: "福山区", level: "area" },
                    { code: "370612", name: "牟平区", level: "area" },
                    { code: "370613", name: "莱山区", level: "area" },
                    { code: "370634", name: "长岛县", level: "area" },
                    { code: "370681", name: "龙口市", level: "area" },
                    { code: "370682", name: "莱阳市", level: "area" },
                    { code: "370683", name: "莱州市", level: "area" },
                    { code: "370684", name: "蓬莱市", level: "area" },
                    { code: "370685", name: "招远市", level: "area" },
                    { code: "370686", name: "栖霞市", level: "area" },
                    { code: "370687", name: "海阳市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "370600", name: "烟台市", level: "city"
            },
            {
                children: [
                    { code: "370702", name: "潍城区", level: "area" },
                    { code: "370703", name: "寒亭区", level: "area" },
                    { code: "370704", name: "坊子区", level: "area" },
                    { code: "370705", name: "奎文区", level: "area" },
                    { code: "370724", name: "临朐县", level: "area" },
                    { code: "370725", name: "昌乐县", level: "area" },
                    { code: "370781", name: "青州市", level: "area" },
                    { code: "370782", name: "诸城市", level: "area" },
                    { code: "370783", name: "寿光市", level: "area" },
                    { code: "370784", name: "安丘市", level: "area" },
                    { code: "370785", name: "高密市", level: "area" },
                    { code: "370786", name: "昌邑市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "370700", name: "潍坊市", level: "city"
            },
            {
                children: [
                    { code: "370802", name: "市中区", level: "area" },
                    { code: "370811", name: "任城区", level: "area" },
                    { code: "370826", name: "微山县", level: "area" },
                    { code: "370827", name: "鱼台县", level: "area" },
                    { code: "370828", name: "金乡县", level: "area" },
                    { code: "370829", name: "嘉祥县", level: "area" },
                    { code: "370830", name: "汶上县", level: "area" },
                    { code: "370831", name: "泗水县", level: "area" },
                    { code: "370832", name: "梁山县", level: "area" },
                    { code: "370881", name: "曲阜市", level: "area" },
                    { code: "370882", name: "兖州市", level: "area" },
                    { code: "370883", name: "邹城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "370800", name: "济宁市", level: "city"
            },
            {
                children: [
                    { code: "370902", name: "泰山区", level: "area" },
                    { code: "370911", name: "岱岳区", level: "area" },
                    { code: "370921", name: "宁阳县", level: "area" },
                    { code: "370923", name: "东平县", level: "area" },
                    { code: "370982", name: "新泰市", level: "area" },
                    { code: "370983", name: "肥城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "370900", name: "泰安市", level: "city"
            },
            {
                children: [
                    { code: "371002", name: "环翠区", level: "area" },
                    { code: "371081", name: "文登市", level: "area" },
                    { code: "371082", name: "荣成市", level: "area" },
                    { code: "371083", name: "乳山市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "371000", name: "威海市", level: "city"
            },
            {
                children: [
                    { code: "371102", name: "东港区", level: "area" },
                    { code: "371103", name: "岚山区", level: "area" },
                    { code: "371121", name: "五莲县", level: "area" },
                    { code: "371122", name: "莒县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "371100", name: "日照市", level: "city"
            },
            {
                children: [
                    { code: "371202", name: "莱城区", level: "area" },
                    { code: "371203", name: "钢城区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "371200", name: "莱芜市", level: "city"
            },
            {
                children: [
                    { code: "371302", name: "兰山区", level: "area" },
                    { code: "371311", name: "罗庄区", level: "area" },
                    { code: "371312", name: "河东区", level: "area" },
                    { code: "371321", name: "沂南县", level: "area" },
                    { code: "371322", name: "郯城县", level: "area" },
                    { code: "371323", name: "沂水县", level: "area" },
                    { code: "371324", name: "苍山县", level: "area" },
                    { code: "371325", name: "费县", level: "area" },
                    { code: "371326", name: "平邑县", level: "area" },
                    { code: "371327", name: "莒南县", level: "area" },
                    { code: "371328", name: "蒙阴县", level: "area" },
                    { code: "371329", name: "临沭县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "371300", name: "临沂市", level: "city"
            },
            {
                children: [
                    { code: "371402", name: "德城区", level: "area" },
                    { code: "371421", name: "陵县", level: "area" },
                    { code: "371422", name: "宁津县", level: "area" },
                    { code: "371423", name: "庆云县", level: "area" },
                    { code: "371424", name: "临邑县", level: "area" },
                    { code: "371425", name: "齐河县", level: "area" },
                    { code: "371426", name: "平原县", level: "area" },
                    { code: "371427", name: "夏津县", level: "area" },
                    { code: "371428", name: "武城县", level: "area" },
                    { code: "371481", name: "乐陵市", level: "area" },
                    { code: "371482", name: "禹城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "371400", name: "德州市", level: "city"
            },
            {
                children: [
                    { code: "371502", name: "东昌府区", level: "area" },
                    { code: "371521", name: "阳谷县", level: "area" },
                    { code: "371522", name: "莘县", level: "area" },
                    { code: "371523", name: "茌平县", level: "area" },
                    { code: "371524", name: "东阿县", level: "area" },
                    { code: "371525", name: "冠县", level: "area" },
                    { code: "371526", name: "高唐县", level: "area" },
                    { code: "371581", name: "临清市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "371500", name: "聊城市", level: "city"
            },
            {
                children: [
                    { code: "371602", name: "滨城区", level: "area" },
                    { code: "371621", name: "惠民县", level: "area" },
                    { code: "371622", name: "阳信县", level: "area" },
                    { code: "371623", name: "无棣县", level: "area" },
                    { code: "371624", name: "沾化县", level: "area" },
                    { code: "371625", name: "博兴县", level: "area" },
                    { code: "371626", name: "邹平县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "371600", name: "滨州市", level: "city"
            },
            {
                children: [
                    { code: "371702", name: "牡丹区", level: "area" },
                    { code: "371721", name: "曹县", level: "area" },
                    { code: "371722", name: "单县", level: "area" },
                    { code: "371723", name: "成武县", level: "area" },
                    { code: "371724", name: "巨野县", level: "area" },
                    { code: "371725", name: "郓城县", level: "area" },
                    { code: "371726", name: "鄄城县", level: "area" },
                    { code: "371727", name: "定陶县", level: "area" },
                    { code: "371728", name: "东明县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "371700", name: "菏泽市", level: "city"
            }
        ], code: "370000", name: "山东省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "410102", name: "中原区", level: "area" },
                    { code: "410103", name: "二七区", level: "area" },
                    { code: "410104", name: "管城回族区", level: "area" },
                    { code: "410105", name: "金水区", level: "area" },
                    { code: "410106", name: "上街区", level: "area" },
                    { code: "410108", name: "惠济区", level: "area" },
                    { code: "410122", name: "中牟县", level: "area" },
                    { code: "410181", name: "巩义市", level: "area" },
                    { code: "410182", name: "荥阳市", level: "area" },
                    { code: "410183", name: "新密市", level: "area" },
                    { code: "410184", name: "新郑市", level: "area" },
                    { code: "410185", name: "登封市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "410100", name: "郑州市", level: "city"
            },
            {
                children: [
                    { code: "410202", name: "龙亭区", level: "area" },
                    { code: "410203", name: "顺河回族区", level: "area" },
                    { code: "410204", name: "鼓楼区", level: "area" },
                    { code: "410205", name: "禹王台区", level: "area" },
                    { code: "410211", name: "金明区", level: "area" },
                    { code: "410221", name: "杞县", level: "area" },
                    { code: "410222", name: "通许县", level: "area" },
                    { code: "410223", name: "尉氏县", level: "area" },
                    { code: "410224", name: "开封县", level: "area" },
                    { code: "410225", name: "兰考县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "410200", name: "开封市", level: "city"
            },
            {
                children: [
                    { code: "410302", name: "老城区", level: "area" },
                    { code: "410303", name: "西工区", level: "area" },
                    { code: "410304", name: "瀍河回族区", level: "area" },
                    { code: "410305", name: "涧西区", level: "area" },
                    { code: "410306", name: "吉利区", level: "area" },
                    { code: "410311", name: "洛龙区", level: "area" },
                    { code: "410322", name: "孟津县", level: "area" },
                    { code: "410323", name: "新安县", level: "area" },
                    { code: "410324", name: "栾川县", level: "area" },
                    { code: "410325", name: "嵩县", level: "area" },
                    { code: "410326", name: "汝阳县", level: "area" },
                    { code: "410327", name: "宜阳县", level: "area" },
                    { code: "410328", name: "洛宁县", level: "area" },
                    { code: "410329", name: "伊川县", level: "area" },
                    { code: "410381", name: "偃师市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "410300", name: "洛阳市", level: "city"
            },
            {
                children: [
                    { code: "410402", name: "新华区", level: "area" },
                    { code: "410403", name: "卫东区", level: "area" },
                    { code: "410404", name: "石龙区", level: "area" },
                    { code: "410411", name: "湛河区", level: "area" },
                    { code: "410421", name: "宝丰县", level: "area" },
                    { code: "410422", name: "叶县", level: "area" },
                    { code: "410423", name: "鲁山县", level: "area" },
                    { code: "410425", name: "郏县", level: "area" },
                    { code: "410481", name: "舞钢市", level: "area" },
                    { code: "410482", name: "汝州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "410400", name: "平顶山市", level: "city"
            },
            {
                children: [
                    { code: "410502", name: "文峰区", level: "area" },
                    { code: "410503", name: "北关区", level: "area" },
                    { code: "410505", name: "殷都区", level: "area" },
                    { code: "410506", name: "龙安区", level: "area" },
                    { code: "410522", name: "安阳县", level: "area" },
                    { code: "410523", name: "汤阴县", level: "area" },
                    { code: "410526", name: "滑县", level: "area" },
                    { code: "410527", name: "内黄县", level: "area" },
                    { code: "410581", name: "林州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "410500", name: "安阳市", level: "city"
            },
            {
                children: [
                    { code: "410602", name: "鹤山区", level: "area" },
                    { code: "410603", name: "山城区", level: "area" },
                    { code: "410611", name: "淇滨区", level: "area" },
                    { code: "410621", name: "浚县", level: "area" },
                    { code: "410622", name: "淇县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "410600", name: "鹤壁市", level: "city"
            },
            {
                children: [
                    { code: "410702", name: "红旗区", level: "area" },
                    { code: "410703", name: "卫滨区", level: "area" },
                    { code: "410704", name: "凤泉区", level: "area" },
                    { code: "410711", name: "牧野区", level: "area" },
                    { code: "410721", name: "新乡县", level: "area" },
                    { code: "410724", name: "获嘉县", level: "area" },
                    { code: "410725", name: "原阳县", level: "area" },
                    { code: "410726", name: "延津县", level: "area" },
                    { code: "410727", name: "封丘县", level: "area" },
                    { code: "410728", name: "长垣县", level: "area" },
                    { code: "410781", name: "卫辉市", level: "area" },
                    { code: "410782", name: "辉县市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "410700", name: "新乡市", level: "city"
            },
            {
                children: [
                    { code: "410802", name: "解放区", level: "area" },
                    { code: "410803", name: "中站区", level: "area" },
                    { code: "410804", name: "马村区", level: "area" },
                    { code: "410811", name: "山阳区", level: "area" },
                    { code: "410821", name: "修武县", level: "area" },
                    { code: "410822", name: "博爱县", level: "area" },
                    { code: "410823", name: "武陟县", level: "area" },
                    { code: "410825", name: "温县", level: "area" },
                    { code: "410882", name: "沁阳市", level: "area" },
                    { code: "410883", name: "孟州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "410800", name: "焦作市", level: "city"
            },
            {
                children: [
                    { code: "410902", name: "华龙区", level: "area" },
                    { code: "410922", name: "清丰县", level: "area" },
                    { code: "410923", name: "南乐县", level: "area" },
                    { code: "410926", name: "范县", level: "area" },
                    { code: "410927", name: "台前县", level: "area" },
                    { code: "410928", name: "濮阳县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "410900", name: "濮阳市", level: "city"
            },
            {
                children: [
                    { code: "411002", name: "魏都区", level: "area" },
                    { code: "411023", name: "许昌县", level: "area" },
                    { code: "411024", name: "鄢陵县", level: "area" },
                    { code: "411025", name: "襄城县", level: "area" },
                    { code: "411081", name: "禹州市", level: "area" },
                    { code: "411082", name: "长葛市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "411000", name: "许昌市", level: "city"
            },
            {
                children: [
                    { code: "411102", name: "源汇区", level: "area" },
                    { code: "411103", name: "郾城区", level: "area" },
                    { code: "411104", name: "召陵区", level: "area" },
                    { code: "411121", name: "舞阳县", level: "area" },
                    { code: "411122", name: "临颍县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "411100", name: "漯河市", level: "city"
            },
            {
                children: [
                    { code: "411202", name: "湖滨区", level: "area" },
                    { code: "411221", name: "渑池县", level: "area" },
                    { code: "411222", name: "陕县", level: "area" },
                    { code: "411224", name: "卢氏县", level: "area" },
                    { code: "411281", name: "义马市", level: "area" },
                    { code: "411282", name: "灵宝市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "411200", name: "三门峡市", level: "city"
            },
            {
                children: [
                    { code: "411302", name: "宛城区", level: "area" },
                    { code: "411303", name: "卧龙区", level: "area" },
                    { code: "411321", name: "南召县", level: "area" },
                    { code: "411322", name: "方城县", level: "area" },
                    { code: "411323", name: "西峡县", level: "area" },
                    { code: "411324", name: "镇平县", level: "area" },
                    { code: "411325", name: "内乡县", level: "area" },
                    { code: "411326", name: "淅川县", level: "area" },
                    { code: "411327", name: "社旗县", level: "area" },
                    { code: "411328", name: "唐河县", level: "area" },
                    { code: "411329", name: "新野县", level: "area" },
                    { code: "411330", name: "桐柏县", level: "area" },
                    { code: "411381", name: "邓州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "411300", name: "南阳市", level: "city"
            },
            {
                children: [
                    { code: "411402", name: "梁园区", level: "area" },
                    { code: "411403", name: "睢阳区", level: "area" },
                    { code: "411421", name: "民权县", level: "area" },
                    { code: "411422", name: "睢县", level: "area" },
                    { code: "411423", name: "宁陵县", level: "area" },
                    { code: "411424", name: "柘城县", level: "area" },
                    { code: "411425", name: "虞城县", level: "area" },
                    { code: "411426", name: "夏邑县", level: "area" },
                    { code: "411481", name: "永城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "411400", name: "商丘市", level: "city"
            },
            {
                children: [
                    { code: "411502", name: "浉河区", level: "area" },
                    { code: "411503", name: "平桥区", level: "area" },
                    { code: "411521", name: "罗山县", level: "area" },
                    { code: "411522", name: "光山县", level: "area" },
                    { code: "411523", name: "新县", level: "area" },
                    { code: "411524", name: "商城县", level: "area" },
                    { code: "411525", name: "固始县", level: "area" },
                    { code: "411526", name: "潢川县", level: "area" },
                    { code: "411527", name: "淮滨县", level: "area" },
                    { code: "411528", name: "息县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "411500", name: "信阳市", level: "city"
            },
            {
                children: [
                    { code: "411602", name: "川汇区", level: "area" },
                    { code: "411621", name: "扶沟县", level: "area" },
                    { code: "411622", name: "西华县", level: "area" },
                    { code: "411623", name: "商水县", level: "area" },
                    { code: "411624", name: "沈丘县", level: "area" },
                    { code: "411625", name: "郸城县", level: "area" },
                    { code: "411626", name: "淮阳县", level: "area" },
                    { code: "411627", name: "太康县", level: "area" },
                    { code: "411628", name: "鹿邑县", level: "area" },
                    { code: "411681", name: "项城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "411600", name: "周口市", level: "city"
            },
            {
                children: [
                    { code: "411702", name: "驿城区", level: "area" },
                    { code: "411721", name: "西平县", level: "area" },
                    { code: "411722", name: "上蔡县", level: "area" },
                    { code: "411723", name: "平舆县", level: "area" },
                    { code: "411724", name: "正阳县", level: "area" },
                    { code: "411725", name: "确山县", level: "area" },
                    { code: "411726", name: "泌阳县", level: "area" },
                    { code: "411727", name: "汝南县", level: "area" },
                    { code: "411728", name: "遂平县", level: "area" },
                    { code: "411729", name: "新蔡县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "411700", name: "驻马店市", level: "city"
            },
            {
                children: [
                    { code: "419001", name: "济源市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "419000", name: "省直辖县级行政区划", level: "city"
            }
        ], code: "410000", name: "河南省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "420102", name: "江岸区", level: "area" },
                    { code: "420103", name: "江汉区", level: "area" },
                    { code: "420104", name: "硚口区", level: "area" },
                    { code: "420105", name: "汉阳区", level: "area" },
                    { code: "420106", name: "武昌区", level: "area" },
                    { code: "420107", name: "青山区", level: "area" },
                    { code: "420111", name: "洪山区", level: "area" },
                    { code: "420112", name: "东西湖区", level: "area" },
                    { code: "420113", name: "汉南区", level: "area" },
                    { code: "420114", name: "蔡甸区", level: "area" },
                    { code: "420115", name: "江夏区", level: "area" },
                    { code: "420116", name: "黄陂区", level: "area" },
                    { code: "420117", name: "新洲区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "420100", name: "武汉市", level: "city"
            },
            {
                children: [
                    { code: "420202", name: "黄石港区", level: "area" },
                    { code: "420203", name: "西塞山区", level: "area" },
                    { code: "420204", name: "下陆区", level: "area" },
                    { code: "420205", name: "铁山区", level: "area" },
                    { code: "420222", name: "阳新县", level: "area" },
                    { code: "420281", name: "大冶市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "420200", name: "黄石市", level: "city"
            },
            {
                children: [
                    { code: "420302", name: "茅箭区", level: "area" },
                    { code: "420303", name: "张湾区", level: "area" },
                    { code: "420321", name: "郧县", level: "area" },
                    { code: "420322", name: "郧西县", level: "area" },
                    { code: "420323", name: "竹山县", level: "area" },
                    { code: "420324", name: "竹溪县", level: "area" },
                    { code: "420325", name: "房县", level: "area" },
                    { code: "420381", name: "丹江口市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "420300", name: "十堰市", level: "city"
            },
            {
                children: [
                    { code: "420502", name: "西陵区", level: "area" },
                    { code: "420503", name: "伍家岗区", level: "area" },
                    { code: "420504", name: "点军区", level: "area" },
                    { code: "420505", name: "猇亭区", level: "area" },
                    { code: "420506", name: "夷陵区", level: "area" },
                    { code: "420525", name: "远安县", level: "area" },
                    { code: "420526", name: "兴山县", level: "area" },
                    { code: "420527", name: "秭归县", level: "area" },
                    { code: "420528", name: "长阳土家族自治县", level: "area" },
                    { code: "420529", name: "五峰土家族自治县", level: "area" },
                    { code: "420581", name: "宜都市", level: "area" },
                    { code: "420582", name: "当阳市", level: "area" },
                    { code: "420583", name: "枝江市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "420500", name: "宜昌市", level: "city"
            },
            {
                children: [
                    { code: "420602", name: "襄城区", level: "area" },
                    { code: "420606", name: "樊城区", level: "area" },
                    { code: "420607", name: "襄州区", level: "area" },
                    { code: "420624", name: "南漳县", level: "area" },
                    { code: "420625", name: "谷城县", level: "area" },
                    { code: "420626", name: "保康县", level: "area" },
                    { code: "420682", name: "老河口市", level: "area" },
                    { code: "420683", name: "枣阳市", level: "area" },
                    { code: "420684", name: "宜城市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "420600", name: "襄阳市", level: "city"
            },
            {
                children: [
                    { code: "420702", name: "梁子湖区", level: "area" },
                    { code: "420703", name: "华容区", level: "area" },
                    { code: "420704", name: "鄂城区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "420700", name: "鄂州市", level: "city"
            },
            {
                children: [
                    { code: "420802", name: "东宝区", level: "area" },
                    { code: "420804", name: "掇刀区", level: "area" },
                    { code: "420821", name: "京山县", level: "area" },
                    { code: "420822", name: "沙洋县", level: "area" },
                    { code: "420881", name: "钟祥市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "420800", name: "荆门市", level: "city"
            },
            {
                children: [
                    { code: "420902", name: "孝南区", level: "area" },
                    { code: "420921", name: "孝昌县", level: "area" },
                    { code: "420922", name: "大悟县", level: "area" },
                    { code: "420923", name: "云梦县", level: "area" },
                    { code: "420981", name: "应城市", level: "area" },
                    { code: "420982", name: "安陆市", level: "area" },
                    { code: "420984", name: "汉川市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "420900", name: "孝感市", level: "city"
            },
            {
                children: [
                    { code: "421002", name: "沙市区", level: "area" },
                    { code: "421003", name: "荆州区", level: "area" },
                    { code: "421022", name: "公安县", level: "area" },
                    { code: "421023", name: "监利县", level: "area" },
                    { code: "421024", name: "江陵县", level: "area" },
                    { code: "421081", name: "石首市", level: "area" },
                    { code: "421083", name: "洪湖市", level: "area" },
                    { code: "421087", name: "松滋市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "421000", name: "荆州市", level: "city"
            },
            {
                children: [
                    { code: "421102", name: "黄州区", level: "area" },
                    { code: "421121", name: "团风县", level: "area" },
                    { code: "421122", name: "红安县", level: "area" },
                    { code: "421123", name: "罗田县", level: "area" },
                    { code: "421124", name: "英山县", level: "area" },
                    { code: "421125", name: "浠水县", level: "area" },
                    { code: "421126", name: "蕲春县", level: "area" },
                    { code: "421127", name: "黄梅县", level: "area" },
                    { code: "421181", name: "麻城市", level: "area" },
                    { code: "421182", name: "武穴市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "421100", name: "黄冈市", level: "city"
            },
            {
                children: [
                    { code: "421202", name: "咸安区", level: "area" },
                    { code: "421221", name: "嘉鱼县", level: "area" },
                    { code: "421222", name: "通城县", level: "area" },
                    { code: "421223", name: "崇阳县", level: "area" },
                    { code: "421224", name: "通山县", level: "area" },
                    { code: "421281", name: "赤壁市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "421200", name: "咸宁市", level: "city"
            },
            {
                children: [
                    { code: "421303", name: "曾都区", level: "area" },
                    { code: "421321", name: "随县", level: "area" },
                    { code: "421381", name: "广水市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "421300", name: "随州市", level: "city"
            },
            {
                children: [
                    { code: "422801", name: "恩施市", level: "area" },
                    { code: "422802", name: "利川市", level: "area" },
                    { code: "422822", name: "建始县", level: "area" },
                    { code: "422823", name: "巴东县", level: "area" },
                    { code: "422825", name: "宣恩县", level: "area" },
                    { code: "422826", name: "咸丰县", level: "area" },
                    { code: "422827", name: "来凤县", level: "area" },
                    { code: "422828", name: "鹤峰县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "422800", name: "恩施土家族苗族自治州", level: "city"
            },
            {
                children: [
                    { code: "429004", name: "仙桃市", level: "area" },
                    { code: "429005", name: "潜江市", level: "area" },
                    { code: "429006", name: "天门市", level: "area" },
                    { code: "429021", name: "神农架林区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "429000", name: "省直辖县级行政区划", level: "city"
            }
        ], code: "420000", name: "湖北省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "430102", name: "芙蓉区", level: "area" },
                    { code: "430103", name: "天心区", level: "area" },
                    { code: "430104", name: "岳麓区", level: "area" },
                    { code: "430105", name: "开福区", level: "area" },
                    { code: "430111", name: "雨花区", level: "area" },
                    { code: "430112", name: "望城区", level: "area" },
                    { code: "430121", name: "长沙县", level: "area" },
                    { code: "430124", name: "宁乡县", level: "area" },
                    { code: "430181", name: "浏阳市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "430100", name: "长沙市", level: "city"
            },
            {
                children: [
                    { code: "430202", name: "荷塘区", level: "area" },
                    { code: "430203", name: "芦淞区", level: "area" },
                    { code: "430204", name: "石峰区", level: "area" },
                    { code: "430211", name: "天元区", level: "area" },
                    { code: "430221", name: "株洲县", level: "area" },
                    { code: "430223", name: "攸县", level: "area" },
                    { code: "430224", name: "茶陵县", level: "area" },
                    { code: "430225", name: "炎陵县", level: "area" },
                    { code: "430281", name: "醴陵市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "430200", name: "株洲市", level: "city"
            },
            {
                children: [
                    { code: "430302", name: "雨湖区", level: "area" },
                    { code: "430304", name: "岳塘区", level: "area" },
                    { code: "430321", name: "湘潭县", level: "area" },
                    { code: "430381", name: "湘乡市", level: "area" },
                    { code: "430382", name: "韶山市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "430300", name: "湘潭市", level: "city"
            },
            {
                children: [
                    { code: "430405", name: "珠晖区", level: "area" },
                    { code: "430406", name: "雁峰区", level: "area" },
                    { code: "430407", name: "石鼓区", level: "area" },
                    { code: "430408", name: "蒸湘区", level: "area" },
                    { code: "430412", name: "南岳区", level: "area" },
                    { code: "430421", name: "衡阳县", level: "area" },
                    { code: "430422", name: "衡南县", level: "area" },
                    { code: "430423", name: "衡山县", level: "area" },
                    { code: "430424", name: "衡东县", level: "area" },
                    { code: "430426", name: "祁东县", level: "area" },
                    { code: "430481", name: "耒阳市", level: "area" },
                    { code: "430482", name: "常宁市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "430400", name: "衡阳市", level: "city"
            },
            {
                children: [
                    { code: "430502", name: "双清区", level: "area" },
                    { code: "430503", name: "大祥区", level: "area" },
                    { code: "430511", name: "北塔区", level: "area" },
                    { code: "430521", name: "邵东县", level: "area" },
                    { code: "430522", name: "新邵县", level: "area" },
                    { code: "430523", name: "邵阳县", level: "area" },
                    { code: "430524", name: "隆回县", level: "area" },
                    { code: "430525", name: "洞口县", level: "area" },
                    { code: "430527", name: "绥宁县", level: "area" },
                    { code: "430528", name: "新宁县", level: "area" },
                    { code: "430529", name: "城步苗族自治县", level: "area" },
                    { code: "430581", name: "武冈市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "430500", name: "邵阳市", level: "city"
            },
            {
                children: [
                    { code: "430602", name: "岳阳楼区", level: "area" },
                    { code: "430603", name: "云溪区", level: "area" },
                    { code: "430611", name: "君山区", level: "area" },
                    { code: "430621", name: "岳阳县", level: "area" },
                    { code: "430623", name: "华容县", level: "area" },
                    { code: "430624", name: "湘阴县", level: "area" },
                    { code: "430626", name: "平江县", level: "area" },
                    { code: "430681", name: "汨罗市", level: "area" },
                    { code: "430682", name: "临湘市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "430600", name: "岳阳市", level: "city"
            },
            {
                children: [
                    { code: "430702", name: "武陵区", level: "area" },
                    { code: "430703", name: "鼎城区", level: "area" },
                    { code: "430721", name: "安乡县", level: "area" },
                    { code: "430722", name: "汉寿县", level: "area" },
                    { code: "430723", name: "澧县", level: "area" },
                    { code: "430724", name: "临澧县", level: "area" },
                    { code: "430725", name: "桃源县", level: "area" },
                    { code: "430726", name: "石门县", level: "area" },
                    { code: "430781", name: "津市市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "430700", name: "常德市", level: "city"
            },
            {
                children: [
                    { code: "430802", name: "永定区", level: "area" },
                    { code: "430811", name: "武陵源区", level: "area" },
                    { code: "430821", name: "慈利县", level: "area" },
                    { code: "430822", name: "桑植县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "430800", name: "张家界市", level: "city"
            },
            {
                children: [
                    { code: "430902", name: "资阳区", level: "area" },
                    { code: "430903", name: "赫山区", level: "area" },
                    { code: "430921", name: "南县", level: "area" },
                    { code: "430922", name: "桃江县", level: "area" },
                    { code: "430923", name: "安化县", level: "area" },
                    { code: "430981", name: "沅江市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "430900", name: "益阳市", level: "city"
            },
            {
                children: [
                    { code: "431002", name: "北湖区", level: "area" },
                    { code: "431003", name: "苏仙区", level: "area" },
                    { code: "431021", name: "桂阳县", level: "area" },
                    { code: "431022", name: "宜章县", level: "area" },
                    { code: "431023", name: "永兴县", level: "area" },
                    { code: "431024", name: "嘉禾县", level: "area" },
                    { code: "431025", name: "临武县", level: "area" },
                    { code: "431026", name: "汝城县", level: "area" },
                    { code: "431027", name: "桂东县", level: "area" },
                    { code: "431028", name: "安仁县", level: "area" },
                    { code: "431081", name: "资兴市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "431000", name: "郴州市", level: "city"
            },
            {
                children: [
                    { code: "431102", name: "零陵区", level: "area" },
                    { code: "431103", name: "冷水滩区", level: "area" },
                    { code: "431121", name: "祁阳县", level: "area" },
                    { code: "431122", name: "东安县", level: "area" },
                    { code: "431123", name: "双牌县", level: "area" },
                    { code: "431124", name: "道县", level: "area" },
                    { code: "431125", name: "江永县", level: "area" },
                    { code: "431126", name: "宁远县", level: "area" },
                    { code: "431127", name: "蓝山县", level: "area" },
                    { code: "431128", name: "新田县", level: "area" },
                    { code: "431129", name: "江华瑶族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "431100", name: "永州市", level: "city"
            },
            {
                children: [
                    { code: "431202", name: "鹤城区", level: "area" },
                    { code: "431221", name: "中方县", level: "area" },
                    { code: "431222", name: "沅陵县", level: "area" },
                    { code: "431223", name: "辰溪县", level: "area" },
                    { code: "431224", name: "溆浦县", level: "area" },
                    { code: "431225", name: "会同县", level: "area" },
                    { code: "431226", name: "麻阳苗族自治县", level: "area" },
                    { code: "431227", name: "新晃侗族自治县", level: "area" },
                    { code: "431228", name: "芷江侗族自治县", level: "area" },
                    { code: "431229", name: "靖州苗族侗族自治县", level: "area" },
                    { code: "431230", name: "通道侗族自治县", level: "area" },
                    { code: "431281", name: "洪江市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "431200", name: "怀化市", level: "city"
            },
            {
                children: [
                    { code: "431302", name: "娄星区", level: "area" },
                    { code: "431321", name: "双峰县", level: "area" },
                    { code: "431322", name: "新化县", level: "area" },
                    { code: "431381", name: "冷水江市", level: "area" },
                    { code: "431382", name: "涟源市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "431300", name: "娄底市", level: "city"
            },
            {
                children: [
                    { code: "433101", name: "吉首市", level: "area" },
                    { code: "433122", name: "泸溪县", level: "area" },
                    { code: "433123", name: "凤凰县", level: "area" },
                    { code: "433124", name: "花垣县", level: "area" },
                    { code: "433125", name: "保靖县", level: "area" },
                    { code: "433126", name: "古丈县", level: "area" },
                    { code: "433127", name: "永顺县", level: "area" },
                    { code: "433130", name: "龙山县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "433100", name: "湘西土家族苗族自治州", level: "city"
            }
        ], code: "430000", name: "湖南省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "440103", name: "荔湾区", level: "area" },
                    { code: "440104", name: "越秀区", level: "area" },
                    { code: "440105", name: "海珠区", level: "area" },
                    { code: "440106", name: "天河区", level: "area" },
                    { code: "440111", name: "白云区", level: "area" },
                    { code: "440112", name: "黄埔区", level: "area" },
                    { code: "440113", name: "番禺区", level: "area" },
                    { code: "440114", name: "花都区", level: "area" },
                    { code: "440115", name: "南沙区", level: "area" },
                    { code: "440116", name: "萝岗区", level: "area" },
                    { code: "440183", name: "增城市", level: "area" },
                    { code: "440184", name: "从化市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "440100", name: "广州市", level: "city"
            },
            {
                children: [
                    { code: "440203", name: "武江区", level: "area" },
                    { code: "440204", name: "浈江区", level: "area" },
                    { code: "440205", name: "曲江区", level: "area" },
                    { code: "440222", name: "始兴县", level: "area" },
                    { code: "440224", name: "仁化县", level: "area" },
                    { code: "440229", name: "翁源县", level: "area" },
                    { code: "440232", name: "乳源瑶族自治县", level: "area" },
                    { code: "440233", name: "新丰县", level: "area" },
                    { code: "440281", name: "乐昌市", level: "area" },
                    { code: "440282", name: "南雄市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "440200", name: "韶关市", level: "city"
            },
            {
                children: [
                    { code: "440303", name: "罗湖区", level: "area" },
                    { code: "440304", name: "福田区", level: "area" },
                    { code: "440305", name: "南山区", level: "area" },
                    { code: "440306", name: "宝安区", level: "area" },
                    { code: "440307", name: "龙岗区", level: "area" },
                    { code: "440308", name: "盐田区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "440300", name: "深圳市", level: "city"
            },
            {
                children: [
                    { code: "440402", name: "香洲区", level: "area" },
                    { code: "440403", name: "斗门区", level: "area" },
                    { code: "440404", name: "金湾区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "440400", name: "珠海市", level: "city"
            },
            {
                children: [
                    { code: "440507", name: "龙湖区", level: "area" },
                    { code: "440511", name: "金平区", level: "area" },
                    { code: "440512", name: "濠江区", level: "area" },
                    { code: "440513", name: "潮阳区", level: "area" },
                    { code: "440514", name: "潮南区", level: "area" },
                    { code: "440515", name: "澄海区", level: "area" },
                    { code: "440523", name: "南澳县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "440500", name: "汕头市", level: "city"
            },
            {
                children: [
                    { code: "440604", name: "禅城区", level: "area" },
                    { code: "440605", name: "南海区", level: "area" },
                    { code: "440606", name: "顺德区", level: "area" },
                    { code: "440607", name: "三水区", level: "area" },
                    { code: "440608", name: "高明区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "440600", name: "佛山市", level: "city"
            },
            {
                children: [
                    { code: "440703", name: "蓬江区", level: "area" },
                    { code: "440704", name: "江海区", level: "area" },
                    { code: "440705", name: "新会区", level: "area" },
                    { code: "440781", name: "台山市", level: "area" },
                    { code: "440783", name: "开平市", level: "area" },
                    { code: "440784", name: "鹤山市", level: "area" },
                    { code: "440785", name: "恩平市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "440700", name: "江门市", level: "city"
            },
            {
                children: [
                    { code: "440802", name: "赤坎区", level: "area" },
                    { code: "440803", name: "霞山区", level: "area" },
                    { code: "440804", name: "坡头区", level: "area" },
                    { code: "440811", name: "麻章区", level: "area" },
                    { code: "440823", name: "遂溪县", level: "area" },
                    { code: "440825", name: "徐闻县", level: "area" },
                    { code: "440881", name: "廉江市", level: "area" },
                    { code: "440882", name: "雷州市", level: "area" },
                    { code: "440883", name: "吴川市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "440800", name: "湛江市", level: "city"
            },
            {
                children: [
                    { code: "440902", name: "茂南区", level: "area" },
                    { code: "440903", name: "茂港区", level: "area" },
                    { code: "440923", name: "电白县", level: "area" },
                    { code: "440981", name: "高州市", level: "area" },
                    { code: "440982", name: "化州市", level: "area" },
                    { code: "440983", name: "信宜市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "440900", name: "茂名市", level: "city"
            },
            {
                children: [
                    { code: "441202", name: "端州区", level: "area" },
                    { code: "441203", name: "鼎湖区", level: "area" },
                    { code: "441223", name: "广宁县", level: "area" },
                    { code: "441224", name: "怀集县", level: "area" },
                    { code: "441225", name: "封开县", level: "area" },
                    { code: "441226", name: "德庆县", level: "area" },
                    { code: "441283", name: "高要市", level: "area" },
                    { code: "441284", name: "四会市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "441200", name: "肇庆市", level: "city"
            },
            {
                children: [
                    { code: "441302", name: "惠城区", level: "area" },
                    { code: "441303", name: "惠阳区", level: "area" },
                    { code: "441322", name: "博罗县", level: "area" },
                    { code: "441323", name: "惠东县", level: "area" },
                    { code: "441324", name: "龙门县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "441300", name: "惠州市", level: "city"
            },
            {
                children: [
                    { code: "441402", name: "梅江区", level: "area" },
                    { code: "441421", name: "梅县", level: "area" },
                    { code: "441422", name: "大埔县", level: "area" },
                    { code: "441423", name: "丰顺县", level: "area" },
                    { code: "441424", name: "五华县", level: "area" },
                    { code: "441426", name: "平远县", level: "area" },
                    { code: "441427", name: "蕉岭县", level: "area" },
                    { code: "441481", name: "兴宁市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "441400", name: "梅州市", level: "city"
            },
            {
                children: [
                    { code: "441502", name: "城区", level: "area" },
                    { code: "441521", name: "海丰县", level: "area" },
                    { code: "441523", name: "陆河县", level: "area" },
                    { code: "441581", name: "陆丰市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "441500", name: "汕尾市", level: "city"
            },
            {
                children: [
                    { code: "441602", name: "源城区", level: "area" },
                    { code: "441621", name: "紫金县", level: "area" },
                    { code: "441622", name: "龙川县", level: "area" },
                    { code: "441623", name: "连平县", level: "area" },
                    { code: "441624", name: "和平县", level: "area" },
                    { code: "441625", name: "东源县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "441600", name: "河源市", level: "city"
            },
            {
                children: [
                    { code: "441702", name: "江城区", level: "area" },
                    { code: "441721", name: "阳西县", level: "area" },
                    { code: "441723", name: "阳东县", level: "area" },
                    { code: "441781", name: "阳春市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "441700", name: "阳江市", level: "city"
            },
            {
                children: [
                    { code: "441802", name: "清城区", level: "area" },
                    { code: "441803", name: "清新区", level: "area" },
                    { code: "441821", name: "佛冈县", level: "area" },
                    { code: "441823", name: "阳山县", level: "area" },
                    { code: "441825", name: "连山壮族瑶族自治县", level: "area" },
                    { code: "441826", name: "连南瑶族自治县", level: "area" },
                    { code: "441881", name: "英德市", level: "area" },
                    { code: "441882", name: "连州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "441800", name: "清远市", level: "city"
            },
            {
                children: [
                    { code: "441901", name: "中堂镇", level: "area" },
                    { code: "441902", name: "南城区", level: "area" },
                    { code: "441903", name: "沙田镇", level: "area" },
                    { code: "441904", name: "长安镇", level: "area" },
                    { code: "441905", name: "东坑镇", level: "area" },
                    { code: "441906", name: "樟木头镇", level: "area" },
                    { code: "441907", name: "莞城区", level: "area" },
                    { code: "441908", name: "石龙镇", level: "area" },
                    { code: "441909", name: "桥头镇", level: "area" },
                    { code: "441910", name: "万江区", level: "area" },
                    { code: "441911", name: "麻涌镇", level: "area" },
                    { code: "441912", name: "虎门镇", level: "area" },
                    { code: "441913", name: "谢岗镇", level: "area" },
                    { code: "441914", name: "石碣镇", level: "area" },
                    { code: "441915", name: "茶山镇", level: "area" },
                    { code: "441916", name: "东城区", level: "area" },
                    { code: "441917", name: "洪梅镇", level: "area" },
                    { code: "441918", name: "道滘镇", level: "area" },
                    { code: "441919", name: "高埗镇", level: "area" },
                    { code: "441920", name: "企石镇", level: "area" },
                    { code: "441921", name: "凤岗镇", level: "area" },
                    { code: "441922", name: "大岭山镇", level: "area" },
                    { code: "441923", name: "松山湖", level: "area" },
                    { code: "441924", name: "清溪镇", level: "area" },
                    { code: "441925", name: "望牛墩镇", level: "area" },
                    { code: "441926", name: "厚街镇", level: "area" },
                    { code: "441927", name: "常平镇", level: "area" },
                    { code: "441928", name: "寮步镇", level: "area" },
                    { code: "441929", name: "石排镇", level: "area" },
                    { code: "441930", name: "横沥镇", level: "area" },
                    { code: "441931", name: "塘厦镇", level: "area" },
                    { code: "441932", name: "黄江镇", level: "area" },
                    { code: "441933", name: "大朗镇", level: "area" },
                ], code: "441900", name: "东莞市", level: "city"
            },
            {
                children: [
                    { code: "442001", name: "南头镇", level: "area" },
                    { code: "442002", name: "神湾镇", level: "area" },
                    { code: "442003", name: "东凤镇", level: "area" },
                    { code: "442004", name: "五桂山镇", level: "area" },
                    { code: "442005", name: "黄圃镇", level: "area" },
                    { code: "442006", name: "小榄镇", level: "area" },
                    { code: "442007", name: "石岐区街道", level: "area" },
                    { code: "442008", name: "横栏镇", level: "area" },
                    { code: "442009", name: "三角镇", level: "area" },
                    { code: "442010", name: "三乡镇", level: "area" },
                    { code: "442011", name: "港口镇", level: "area" },
                    { code: "442012", name: "沙溪镇", level: "area" },
                    { code: "442013", name: "板芙镇", level: "area" },
                    { code: "442014", name: "沙朗镇", level: "area" },
                    { code: "442015", name: "东升镇", level: "area" },
                    { code: "442016", name: "阜沙镇", level: "area" },
                    { code: "442017", name: "民众镇", level: "area" },
                    { code: "442018", name: "东区街道", level: "area" },
                    { code: "442019", name: "火炬开发区", level: "area" },
                    { code: "442020", name: "西区街道", level: "area" },
                    { code: "442021", name: "南区街道", level: "area" },
                    { code: "442022", name: "古街", level: "area" },
                    { code: "442023", name: "坦洲镇", level: "area" },
                    { code: "442024", name: "大涌镇", level: "area" },
                    { code: "442025", name: "南朗镇", level: "area" },
                ], code: "442000", name: "中山市", level: "city"
            },
            {
                children: [
                    { code: "445102", name: "湘桥区", level: "area" },
                    { code: "445103", name: "潮安区", level: "area" },
                    { code: "445122", name: "饶平县", level: "area" },
                    { code: "445123", name: "枫溪区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "445100", name: "潮州市", level: "city"
            },
            {
                children: [
                    { code: "445202", name: "榕城区", level: "area" },
                    { code: "445203", name: "揭东区", level: "area" },
                    { code: "445222", name: "揭西县", level: "area" },
                    { code: "445224", name: "惠来县", level: "area" },
                    { code: "445281", name: "普宁市", level: "area" },
                    { code: "445282", name: "东山区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "445200", name: "揭阳市", level: "city"
            },
            {
                children: [
                    { code: "445302", name: "云城区", level: "area" },
                    { code: "445321", name: "新兴县", level: "area" },
                    { code: "445322", name: "郁南县", level: "area" },
                    { code: "445323", name: "云安县", level: "area" },
                    { code: "445381", name: "罗定市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "445300", name: "云浮市", level: "city"
            }
        ], code: "440000", name: "广东省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "450102", name: "兴宁区", level: "area" },
                    { code: "450103", name: "青秀区", level: "area" },
                    { code: "450105", name: "江南区", level: "area" },
                    { code: "450107", name: "西乡塘区", level: "area" },
                    { code: "450108", name: "良庆区", level: "area" },
                    { code: "450109", name: "邕宁区", level: "area" },
                    { code: "450122", name: "武鸣县", level: "area" },
                    { code: "450123", name: "隆安县", level: "area" },
                    { code: "450124", name: "马山县", level: "area" },
                    { code: "450125", name: "上林县", level: "area" },
                    { code: "450126", name: "宾阳县", level: "area" },
                    { code: "450127", name: "横县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "450100", name: "南宁市", level: "city"
            },
            {
                children: [
                    { code: "450202", name: "城中区", level: "area" },
                    { code: "450203", name: "鱼峰区", level: "area" },
                    { code: "450204", name: "柳南区", level: "area" },
                    { code: "450205", name: "柳北区", level: "area" },
                    { code: "450221", name: "柳江县", level: "area" },
                    { code: "450222", name: "柳城县", level: "area" },
                    { code: "450223", name: "鹿寨县", level: "area" },
                    { code: "450224", name: "融安县", level: "area" },
                    { code: "450225", name: "融水苗族自治县", level: "area" },
                    { code: "450226", name: "三江侗族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "450200", name: "柳州市", level: "city"
            },
            {
                children: [
                    { code: "450302", name: "秀峰区", level: "area" },
                    { code: "450303", name: "叠彩区", level: "area" },
                    { code: "450304", name: "象山区", level: "area" },
                    { code: "450305", name: "七星区", level: "area" },
                    { code: "450311", name: "雁山区", level: "area" },
                    { code: "450312", name: "临桂区", level: "area" },
                    { code: "450321", name: "阳朔县", level: "area" },
                    { code: "450323", name: "灵川县", level: "area" },
                    { code: "450324", name: "全州县", level: "area" },
                    { code: "450325", name: "兴安县", level: "area" },
                    { code: "450326", name: "永福县", level: "area" },
                    { code: "450327", name: "灌阳县", level: "area" },
                    { code: "450328", name: "龙胜各族自治县", level: "area" },
                    { code: "450329", name: "资源县", level: "area" },
                    { code: "450330", name: "平乐县", level: "area" },
                    { code: "450331", name: "荔浦县", level: "area" },
                    { code: "450332", name: "恭城瑶族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "450300", name: "桂林市", level: "city"
            },
            {
                children: [
                    { code: "450403", name: "万秀区", level: "area" },
                    { code: "450405", name: "长洲区", level: "area" },
                    { code: "450406", name: "龙圩区", level: "area" },
                    { code: "450421", name: "苍梧县", level: "area" },
                    { code: "450422", name: "藤县", level: "area" },
                    { code: "450423", name: "蒙山县", level: "area" },
                    { code: "450481", name: "岑溪市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "450400", name: "梧州市", level: "city"
            },
            {
                children: [
                    { code: "450502", name: "海城区", level: "area" },
                    { code: "450503", name: "银海区", level: "area" },
                    { code: "450512", name: "铁山港区", level: "area" },
                    { code: "450521", name: "合浦县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "450500", name: "北海市", level: "city"
            },
            {
                children: [
                    { code: "450602", name: "港口区", level: "area" },
                    { code: "450603", name: "防城区", level: "area" },
                    { code: "450621", name: "上思县", level: "area" },
                    { code: "450681", name: "东兴市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "450600", name: "防城港市", level: "city"
            },
            {
                children: [
                    { code: "450702", name: "钦南区", level: "area" },
                    { code: "450703", name: "钦北区", level: "area" },
                    { code: "450721", name: "灵山县", level: "area" },
                    { code: "450722", name: "浦北县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "450700", name: "钦州市", level: "city"
            },
            {
                children: [
                    { code: "450802", name: "港北区", level: "area" },
                    { code: "450803", name: "港南区", level: "area" },
                    { code: "450804", name: "覃塘区", level: "area" },
                    { code: "450821", name: "平南县", level: "area" },
                    { code: "450881", name: "桂平市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "450800", name: "贵港市", level: "city"
            },
            {
                children: [
                    { code: "450902", name: "玉州区", level: "area" },
                    { code: "450903", name: "福绵区", level: "area" },
                    { code: "450921", name: "容县", level: "area" },
                    { code: "450922", name: "陆川县", level: "area" },
                    { code: "450923", name: "博白县", level: "area" },
                    { code: "450924", name: "兴业县", level: "area" },
                    { code: "450981", name: "北流市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "450900", name: "玉林市", level: "city"
            },
            {
                children: [
                    { code: "451002", name: "右江区", level: "area" },
                    { code: "451021", name: "田阳县", level: "area" },
                    { code: "451022", name: "田东县", level: "area" },
                    { code: "451023", name: "平果县", level: "area" },
                    { code: "451024", name: "德保县", level: "area" },
                    { code: "451025", name: "靖西县", level: "area" },
                    { code: "451026", name: "那坡县", level: "area" },
                    { code: "451027", name: "凌云县", level: "area" },
                    { code: "451028", name: "乐业县", level: "area" },
                    { code: "451029", name: "田林县", level: "area" },
                    { code: "451030", name: "西林县", level: "area" },
                    { code: "451031", name: "隆林各族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "451000", name: "百色市", level: "city"
            },
            {
                children: [
                    { code: "451102", name: "八步区", level: "area" },
                    { code: "451121", name: "昭平县", level: "area" },
                    { code: "451122", name: "钟山县", level: "area" },
                    { code: "451123", name: "富川瑶族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "451100", name: "贺州市", level: "city"
            },
            {
                children: [
                    { code: "451202", name: "金城江区", level: "area" },
                    { code: "451221", name: "南丹县", level: "area" },
                    { code: "451222", name: "天峨县", level: "area" },
                    { code: "451223", name: "凤山县", level: "area" },
                    { code: "451224", name: "东兰县", level: "area" },
                    { code: "451225", name: "罗城仫佬族自治县", level: "area" },
                    { code: "451226", name: "环江毛南族自治县", level: "area" },
                    { code: "451227", name: "巴马瑶族自治县", level: "area" },
                    { code: "451228", name: "都安瑶族自治县", level: "area" },
                    { code: "451229", name: "大化瑶族自治县", level: "area" },
                    { code: "451281", name: "宜州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "451200", name: "河池市", level: "city"
            },
            {
                children: [
                    { code: "451302", name: "兴宾区", level: "area" },
                    { code: "451321", name: "忻城县", level: "area" },
                    { code: "451322", name: "象州县", level: "area" },
                    { code: "451323", name: "武宣县", level: "area" },
                    { code: "451324", name: "金秀瑶族自治县", level: "area" },
                    { code: "451381", name: "合山市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "451300", name: "来宾市", level: "city"
            },
            {
                children: [
                    { code: "451402", name: "江州区", level: "area" },
                    { code: "451421", name: "扶绥县", level: "area" },
                    { code: "451422", name: "宁明县", level: "area" },
                    { code: "451423", name: "龙州县", level: "area" },
                    { code: "451424", name: "大新县", level: "area" },
                    { code: "451425", name: "天等县", level: "area" },
                    { code: "451481", name: "凭祥市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "451400", name: "崇左市", level: "city"
            }
        ], code: "450000", name: "广西壮族自治区", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "460105", name: "秀英区", level: "area" },
                    { code: "460106", name: "龙华区", level: "area" },
                    { code: "460107", name: "琼山区", level: "area" },
                    { code: "460108", name: "美兰区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "460100", name: "海口市", level: "city"
            },
            {
                children: [
                    { code: "460201", name: "天涯镇", level: "area" },
                    { code: "460202", name: "吉阳镇", level: "area" },
                    { code: "460203", name: "南滨农场", level: "area" },
                    { code: "460204", name: "南岛农场", level: "area" },
                    { code: "460205", name: "河西区", level: "area" },
                    { code: "460206", name: "崖城镇", level: "area" },
                    { code: "460207", name: "育才镇", level: "area" },
                    { code: "460208", name: "海棠湾镇", level: "area" },
                    { code: "460209", name: "南新农场", level: "area" },
                    { code: "460210", name: "凤凰镇", level: "area" },
                    { code: "460211", name: "河东区", level: "area" },
                    { code: "460212", name: "南田农场", level: "area" },
                    { code: "460213", name: "立才农场", level: "area" },
                ], code: "460200", name: "三亚市", level: "city"
            },
            {
                children: [
                    { code: "460321", name: "西沙群岛", level: "area" },
                    { code: "460322", name: "南沙群岛", level: "area" },
                    { code: "460323", name: "中沙群岛的岛礁及其海域", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "460300", name: "三沙市", level: "city"
            },
            {
                children: [
                    { code: "469001", name: "五指山市", level: "area" },
                    { code: "469002", name: "琼海市", level: "area" },
                    { code: "469003", name: "儋州市", level: "area" },
                    { code: "469005", name: "文昌市", level: "area" },
                    { code: "469006", name: "万宁市", level: "area" },
                    { code: "469007", name: "东方市", level: "area" },
                    { code: "469021", name: "定安县", level: "area" },
                    { code: "469022", name: "屯昌县", level: "area" },
                    { code: "469023", name: "澄迈县", level: "area" },
                    { code: "469024", name: "临高县", level: "area" },
                    { code: "469025", name: "白沙黎族自治县", level: "area" },
                    { code: "469026", name: "昌江黎族自治县", level: "area" },
                    { code: "469027", name: "乐东黎族自治县", level: "area" },
                    { code: "469028", name: "陵水黎族自治县", level: "area" },
                    { code: "469029", name: "保亭黎族苗族自治县", level: "area" },
                    { code: "469030", name: "琼中黎族苗族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "469000", name: "省直辖县级行政区划", level: "city"
            }
        ], code: "460000", name: "海南省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "500101", name: "万州区", level: "area" },
                    { code: "500102", name: "涪陵区", level: "area" },
                    { code: "500103", name: "渝中区", level: "area" },
                    { code: "500104", name: "大渡口区", level: "area" },
                    { code: "500105", name: "江北区", level: "area" },
                    { code: "500106", name: "沙坪坝区", level: "area" },
                    { code: "500107", name: "九龙坡区", level: "area" },
                    { code: "500108", name: "南岸区", level: "area" },
                    { code: "500109", name: "北碚区", level: "area" },
                    { code: "500110", name: "綦江区", level: "area" },
                    { code: "500111", name: "大足区", level: "area" },
                    { code: "500112", name: "渝北区", level: "area" },
                    { code: "500113", name: "巴南区", level: "area" },
                    { code: "500114", name: "黔江区", level: "area" },
                    { code: "500115", name: "长寿区", level: "area" },
                    { code: "500116", name: "江津区", level: "area" },
                    { code: "500117", name: "合川区", level: "area" },
                    { code: "500118", name: "永川区", level: "area" },
                    { code: "500119", name: "南川区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "500100", name: "重庆市", level: "city"
            },
            {
                children: [
                    { code: "500223", name: "潼南县", level: "area" },
                    { code: "500224", name: "铜梁县", level: "area" },
                    { code: "500226", name: "荣昌县", level: "area" },
                    { code: "500227", name: "璧山县", level: "area" },
                    { code: "500228", name: "梁平县", level: "area" },
                    { code: "500229", name: "城口县", level: "area" },
                    { code: "500230", name: "丰都县", level: "area" },
                    { code: "500231", name: "垫江县", level: "area" },
                    { code: "500232", name: "武隆县", level: "area" },
                    { code: "500233", name: "忠县", level: "area" },
                    { code: "500234", name: "开县", level: "area" },
                    { code: "500235", name: "云阳县", level: "area" },
                    { code: "500236", name: "奉节县", level: "area" },
                    { code: "500237", name: "巫山县", level: "area" },
                    { code: "500238", name: "巫溪县", level: "area" },
                    { code: "500240", name: "石柱土家族自治县", level: "area" },
                    { code: "500241", name: "秀山土家族苗族自治县", level: "area" },
                    { code: "500242", name: "酉阳土家族苗族自治县", level: "area" },
                    { code: "500243", name: "彭水苗族土家族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "500200", name: "县", level: "city"
            }
        ], code: "500000", name: "重庆市", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "510104", name: "锦江区", level: "area" },
                    { code: "510105", name: "青羊区", level: "area" },
                    { code: "510106", name: "金牛区", level: "area" },
                    { code: "510107", name: "武侯区", level: "area" },
                    { code: "510108", name: "成华区", level: "area" },
                    { code: "510112", name: "龙泉驿区", level: "area" },
                    { code: "510113", name: "青白江区", level: "area" },
                    { code: "510114", name: "新都区", level: "area" },
                    { code: "510115", name: "温江区", level: "area" },
                    { code: "510121", name: "金堂县", level: "area" },
                    { code: "510122", name: "双流县", level: "area" },
                    { code: "510124", name: "郫县", level: "area" },
                    { code: "510129", name: "大邑县", level: "area" },
                    { code: "510131", name: "蒲江县", level: "area" },
                    { code: "510132", name: "新津县", level: "area" },
                    { code: "510181", name: "都江堰市", level: "area" },
                    { code: "510182", name: "彭州市", level: "area" },
                    { code: "510183", name: "邛崃市", level: "area" },
                    { code: "510184", name: "崇州市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "510100", name: "成都市", level: "city"
            },
            {
                children: [
                    { code: "510302", name: "自流井区", level: "area" },
                    { code: "510303", name: "贡井区", level: "area" },
                    { code: "510304", name: "大安区", level: "area" },
                    { code: "510311", name: "沿滩区", level: "area" },
                    { code: "510321", name: "荣县", level: "area" },
                    { code: "510322", name: "富顺县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "510300", name: "自贡市", level: "city"
            },
            {
                children: [
                    { code: "510402", name: "东区", level: "area" },
                    { code: "510403", name: "西区", level: "area" },
                    { code: "510411", name: "仁和区", level: "area" },
                    { code: "510421", name: "米易县", level: "area" },
                    { code: "510422", name: "盐边县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "510400", name: "攀枝花市", level: "city"
            },
            {
                children: [
                    { code: "510502", name: "江阳区", level: "area" },
                    { code: "510503", name: "纳溪区", level: "area" },
                    { code: "510504", name: "龙马潭区", level: "area" },
                    { code: "510521", name: "泸县", level: "area" },
                    { code: "510522", name: "合江县", level: "area" },
                    { code: "510524", name: "叙永县", level: "area" },
                    { code: "510525", name: "古蔺县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "510500", name: "泸州市", level: "city"
            },
            {
                children: [
                    { code: "510603", name: "旌阳区", level: "area" },
                    { code: "510623", name: "中江县", level: "area" },
                    { code: "510626", name: "罗江县", level: "area" },
                    { code: "510681", name: "广汉市", level: "area" },
                    { code: "510682", name: "什邡市", level: "area" },
                    { code: "510683", name: "绵竹市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "510600", name: "德阳市", level: "city"
            },
            {
                children: [
                    { code: "510703", name: "涪城区", level: "area" },
                    { code: "510704", name: "游仙区", level: "area" },
                    { code: "510722", name: "三台县", level: "area" },
                    { code: "510723", name: "盐亭县", level: "area" },
                    { code: "510724", name: "安县", level: "area" },
                    { code: "510725", name: "梓潼县", level: "area" },
                    { code: "510726", name: "北川羌族自治县", level: "area" },
                    { code: "510727", name: "平武县", level: "area" },
                    { code: "510781", name: "江油市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "510700", name: "绵阳市", level: "city"
            },
            {
                children: [
                    { code: "510802", name: "利州区", level: "area" },
                    { code: "510811", name: "元坝区", level: "area" },
                    { code: "510812", name: "朝天区", level: "area" },
                    { code: "510821", name: "旺苍县", level: "area" },
                    { code: "510822", name: "青川县", level: "area" },
                    { code: "510823", name: "剑阁县", level: "area" },
                    { code: "510824", name: "苍溪县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "510800", name: "广元市", level: "city"
            },
            {
                children: [
                    { code: "510903", name: "船山区", level: "area" },
                    { code: "510904", name: "安居区", level: "area" },
                    { code: "510921", name: "蓬溪县", level: "area" },
                    { code: "510922", name: "射洪县", level: "area" },
                    { code: "510923", name: "大英县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "510900", name: "遂宁市", level: "city"
            },
            {
                children: [
                    { code: "511002", name: "市中区", level: "area" },
                    { code: "511011", name: "东兴区", level: "area" },
                    { code: "511024", name: "威远县", level: "area" },
                    { code: "511025", name: "资中县", level: "area" },
                    { code: "511028", name: "隆昌县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "511000", name: "内江市", level: "city"
            },
            {
                children: [
                    { code: "511102", name: "市中区", level: "area" },
                    { code: "511111", name: "沙湾区", level: "area" },
                    { code: "511112", name: "五通桥区", level: "area" },
                    { code: "511113", name: "金口河区", level: "area" },
                    { code: "511123", name: "犍为县", level: "area" },
                    { code: "511124", name: "井研县", level: "area" },
                    { code: "511126", name: "夹江县", level: "area" },
                    { code: "511129", name: "沐川县", level: "area" },
                    { code: "511132", name: "峨边彝族自治县", level: "area" },
                    { code: "511133", name: "马边彝族自治县", level: "area" },
                    { code: "511181", name: "峨眉山市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "511100", name: "乐山市", level: "city"
            },
            {
                children: [
                    { code: "511302", name: "顺庆区", level: "area" },
                    { code: "511303", name: "高坪区", level: "area" },
                    { code: "511304", name: "嘉陵区", level: "area" },
                    { code: "511321", name: "南部县", level: "area" },
                    { code: "511322", name: "营山县", level: "area" },
                    { code: "511323", name: "蓬安县", level: "area" },
                    { code: "511324", name: "仪陇县", level: "area" },
                    { code: "511325", name: "西充县", level: "area" },
                    { code: "511381", name: "阆中市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "511300", name: "南充市", level: "city"
            },
            {
                children: [
                    { code: "511402", name: "东坡区", level: "area" },
                    { code: "511421", name: "仁寿县", level: "area" },
                    { code: "511422", name: "彭山县", level: "area" },
                    { code: "511423", name: "洪雅县", level: "area" },
                    { code: "511424", name: "丹棱县", level: "area" },
                    { code: "511425", name: "青神县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "511400", name: "眉山市", level: "city"
            },
            {
                children: [
                    { code: "511502", name: "翠屏区", level: "area" },
                    { code: "511503", name: "南溪区", level: "area" },
                    { code: "511521", name: "宜宾县", level: "area" },
                    { code: "511523", name: "江安县", level: "area" },
                    { code: "511524", name: "长宁县", level: "area" },
                    { code: "511525", name: "高县", level: "area" },
                    { code: "511526", name: "珙县", level: "area" },
                    { code: "511527", name: "筠连县", level: "area" },
                    { code: "511528", name: "兴文县", level: "area" },
                    { code: "511529", name: "屏山县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "511500", name: "宜宾市", level: "city"
            },
            {
                children: [
                    { code: "511602", name: "广安区", level: "area" },
                    { code: "511603", name: "前锋区", level: "area" },
                    { code: "511621", name: "岳池县", level: "area" },
                    { code: "511622", name: "武胜县", level: "area" },
                    { code: "511623", name: "邻水县", level: "area" },
                    { code: "511681", name: "华蓥市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "511600", name: "广安市", level: "city"
            },
            {
                children: [
                    { code: "511702", name: "通川区", level: "area" },
                    { code: "511703", name: "达川区", level: "area" },
                    { code: "511722", name: "宣汉县", level: "area" },
                    { code: "511723", name: "开江县", level: "area" },
                    { code: "511724", name: "大竹县", level: "area" },
                    { code: "511725", name: "渠县", level: "area" },
                    { code: "511781", name: "万源市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "511700", name: "达州市", level: "city"
            },
            {
                children: [
                    { code: "511802", name: "雨城区", level: "area" },
                    { code: "511803", name: "名山区", level: "area" },
                    { code: "511822", name: "荥经县", level: "area" },
                    { code: "511823", name: "汉源县", level: "area" },
                    { code: "511824", name: "石棉县", level: "area" },
                    { code: "511825", name: "天全县", level: "area" },
                    { code: "511826", name: "芦山县", level: "area" },
                    { code: "511827", name: "宝兴县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "511800", name: "雅安市", level: "city"
            },
            {
                children: [
                    { code: "511902", name: "巴州区", level: "area" },
                    { code: "511903", name: "恩阳区", level: "area" },
                    { code: "511921", name: "通江县", level: "area" },
                    { code: "511922", name: "南江县", level: "area" },
                    { code: "511923", name: "平昌县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "511900", name: "巴中市", level: "city"
            },
            {
                children: [
                    { code: "512002", name: "雁江区", level: "area" },
                    { code: "512021", name: "安岳县", level: "area" },
                    { code: "512022", name: "乐至县", level: "area" },
                    { code: "512081", name: "简阳市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "512000", name: "资阳市", level: "city"
            },
            {
                children: [
                    { code: "513221", name: "汶川县", level: "area" },
                    { code: "513222", name: "理县", level: "area" },
                    { code: "513223", name: "茂县", level: "area" },
                    { code: "513224", name: "松潘县", level: "area" },
                    { code: "513225", name: "九寨沟县", level: "area" },
                    { code: "513226", name: "金川县", level: "area" },
                    { code: "513227", name: "小金县", level: "area" },
                    { code: "513228", name: "黑水县", level: "area" },
                    { code: "513229", name: "马尔康县", level: "area" },
                    { code: "513230", name: "壤塘县", level: "area" },
                    { code: "513231", name: "阿坝县", level: "area" },
                    { code: "513232", name: "若尔盖县", level: "area" },
                    { code: "513233", name: "红原县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "513200", name: "阿坝藏族羌族自治州", level: "city"
            },
            {
                children: [
                    { code: "513321", name: "康定县", level: "area" },
                    { code: "513322", name: "泸定县", level: "area" },
                    { code: "513323", name: "丹巴县", level: "area" },
                    { code: "513324", name: "九龙县", level: "area" },
                    { code: "513325", name: "雅江县", level: "area" },
                    { code: "513326", name: "道孚县", level: "area" },
                    { code: "513327", name: "炉霍县", level: "area" },
                    { code: "513328", name: "甘孜县", level: "area" },
                    { code: "513329", name: "新龙县", level: "area" },
                    { code: "513330", name: "德格县", level: "area" },
                    { code: "513331", name: "白玉县", level: "area" },
                    { code: "513332", name: "石渠县", level: "area" },
                    { code: "513333", name: "色达县", level: "area" },
                    { code: "513334", name: "理塘县", level: "area" },
                    { code: "513335", name: "巴塘县", level: "area" },
                    { code: "513336", name: "乡城县", level: "area" },
                    { code: "513337", name: "稻城县", level: "area" },
                    { code: "513338", name: "得荣县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "513300", name: "甘孜藏族自治州", level: "city"
            },
            {
                children: [
                    { code: "513401", name: "西昌市", level: "area" },
                    { code: "513422", name: "木里藏族自治县", level: "area" },
                    { code: "513423", name: "盐源县", level: "area" },
                    { code: "513424", name: "德昌县", level: "area" },
                    { code: "513425", name: "会理县", level: "area" },
                    { code: "513426", name: "会东县", level: "area" },
                    { code: "513427", name: "宁南县", level: "area" },
                    { code: "513428", name: "普格县", level: "area" },
                    { code: "513429", name: "布拖县", level: "area" },
                    { code: "513430", name: "金阳县", level: "area" },
                    { code: "513431", name: "昭觉县", level: "area" },
                    { code: "513432", name: "喜德县", level: "area" },
                    { code: "513433", name: "冕宁县", level: "area" },
                    { code: "513434", name: "越西县", level: "area" },
                    { code: "513435", name: "甘洛县", level: "area" },
                    { code: "513436", name: "美姑县", level: "area" },
                    { code: "513437", name: "雷波县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "513400", name: "凉山彝族自治州", level: "city"
            }
        ], code: "510000", name: "四川省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "520102", name: "南明区", level: "area" },
                    { code: "520103", name: "云岩区", level: "area" },
                    { code: "520111", name: "花溪区", level: "area" },
                    { code: "520112", name: "乌当区", level: "area" },
                    { code: "520113", name: "白云区", level: "area" },
                    { code: "520115", name: "观山湖区", level: "area" },
                    { code: "520121", name: "开阳县", level: "area" },
                    { code: "520122", name: "息烽县", level: "area" },
                    { code: "520123", name: "修文县", level: "area" },
                    { code: "520181", name: "清镇市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "520100", name: "贵阳市", level: "city"
            },
            {
                children: [
                    { code: "520201", name: "钟山区", level: "area" },
                    { code: "520203", name: "六枝特区", level: "area" },
                    { code: "520221", name: "水城县", level: "area" },
                    { code: "520222", name: "盘县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "520200", name: "六盘水市", level: "city"
            },
            {
                children: [
                    { code: "520302", name: "红花岗区", level: "area" },
                    { code: "520303", name: "汇川区", level: "area" },
                    { code: "520321", name: "遵义县", level: "area" },
                    { code: "520322", name: "桐梓县", level: "area" },
                    { code: "520323", name: "绥阳县", level: "area" },
                    { code: "520324", name: "正安县", level: "area" },
                    { code: "520325", name: "道真仡佬族苗族自治县", level: "area" },
                    { code: "520326", name: "务川仡佬族苗族自治县", level: "area" },
                    { code: "520327", name: "凤冈县", level: "area" },
                    { code: "520328", name: "湄潭县", level: "area" },
                    { code: "520329", name: "余庆县", level: "area" },
                    { code: "520330", name: "习水县", level: "area" },
                    { code: "520381", name: "赤水市", level: "area" },
                    { code: "520382", name: "仁怀市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "520300", name: "遵义市", level: "city"
            },
            {
                children: [
                    { code: "520402", name: "西秀区", level: "area" },
                    { code: "520421", name: "平坝县", level: "area" },
                    { code: "520422", name: "普定县", level: "area" },
                    { code: "520423", name: "镇宁布依族苗族自治县", level: "area" },
                    { code: "520424", name: "关岭布依族苗族自治县", level: "area" },
                    { code: "520425", name: "紫云苗族布依族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "520400", name: "安顺市", level: "city"
            },
            {
                children: [
                    { code: "520502", name: "七星关区", level: "area" },
                    { code: "520521", name: "大方县", level: "area" },
                    { code: "520522", name: "黔西县", level: "area" },
                    { code: "520523", name: "金沙县", level: "area" },
                    { code: "520524", name: "织金县", level: "area" },
                    { code: "520525", name: "纳雍县", level: "area" },
                    { code: "520526", name: "威宁彝族回族苗族自治县", level: "area" },
                    { code: "520527", name: "赫章县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "520500", name: "毕节市", level: "city"
            },
            {
                children: [
                    { code: "520602", name: "碧江区", level: "area" },
                    { code: "520603", name: "万山区", level: "area" },
                    { code: "520621", name: "江口县", level: "area" },
                    { code: "520622", name: "玉屏侗族自治县", level: "area" },
                    { code: "520623", name: "石阡县", level: "area" },
                    { code: "520624", name: "思南县", level: "area" },
                    { code: "520625", name: "印江土家族苗族自治县", level: "area" },
                    { code: "520626", name: "德江县", level: "area" },
                    { code: "520627", name: "沿河土家族自治县", level: "area" },
                    { code: "520628", name: "松桃苗族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "520600", name: "铜仁市", level: "city"
            },
            {
                children: [
                    { code: "522301", name: "兴义市", level: "area" },
                    { code: "522322", name: "兴仁县", level: "area" },
                    { code: "522323", name: "普安县", level: "area" },
                    { code: "522324", name: "晴隆县", level: "area" },
                    { code: "522325", name: "贞丰县", level: "area" },
                    { code: "522326", name: "望谟县", level: "area" },
                    { code: "522327", name: "册亨县", level: "area" },
                    { code: "522328", name: "安龙县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "522300", name: "黔西南布依族苗族自治州", level: "city"
            },
            {
                children: [
                    { code: "522601", name: "凯里市", level: "area" },
                    { code: "522622", name: "黄平县", level: "area" },
                    { code: "522623", name: "施秉县", level: "area" },
                    { code: "522624", name: "三穗县", level: "area" },
                    { code: "522625", name: "镇远县", level: "area" },
                    { code: "522626", name: "岑巩县", level: "area" },
                    { code: "522627", name: "天柱县", level: "area" },
                    { code: "522628", name: "锦屏县", level: "area" },
                    { code: "522629", name: "剑河县", level: "area" },
                    { code: "522630", name: "台江县", level: "area" },
                    { code: "522631", name: "黎平县", level: "area" },
                    { code: "522632", name: "榕江县", level: "area" },
                    { code: "522633", name: "从江县", level: "area" },
                    { code: "522634", name: "雷山县", level: "area" },
                    { code: "522635", name: "麻江县", level: "area" },
                    { code: "522636", name: "丹寨县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "522600", name: "黔东南苗族侗族自治州", level: "city"
            },
            {
                children: [
                    { code: "522701", name: "都匀市", level: "area" },
                    { code: "522702", name: "福泉市", level: "area" },
                    { code: "522722", name: "荔波县", level: "area" },
                    { code: "522723", name: "贵定县", level: "area" },
                    { code: "522725", name: "瓮安县", level: "area" },
                    { code: "522726", name: "独山县", level: "area" },
                    { code: "522727", name: "平塘县", level: "area" },
                    { code: "522728", name: "罗甸县", level: "area" },
                    { code: "522729", name: "长顺县", level: "area" },
                    { code: "522730", name: "龙里县", level: "area" },
                    { code: "522731", name: "惠水县", level: "area" },
                    { code: "522732", name: "三都水族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "522700", name: "黔南布依族苗族自治州", level: "city"
            }
        ], code: "520000", name: "贵州省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "530102", name: "五华区", level: "area" },
                    { code: "530103", name: "盘龙区", level: "area" },
                    { code: "530111", name: "官渡区", level: "area" },
                    { code: "530112", name: "西山区", level: "area" },
                    { code: "530113", name: "东川区", level: "area" },
                    { code: "530114", name: "呈贡区", level: "area" },
                    { code: "530122", name: "晋宁县", level: "area" },
                    { code: "530124", name: "富民县", level: "area" },
                    { code: "530125", name: "宜良县", level: "area" },
                    { code: "530126", name: "石林彝族自治县", level: "area" },
                    { code: "530127", name: "嵩明县", level: "area" },
                    { code: "530128", name: "禄劝彝族苗族自治县", level: "area" },
                    { code: "530129", name: "寻甸回族彝族自治县", level: "area" },
                    { code: "530181", name: "安宁市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "530100", name: "昆明市", level: "city"
            },
            {
                children: [
                    { code: "530302", name: "麒麟区", level: "area" },
                    { code: "530321", name: "马龙县", level: "area" },
                    { code: "530322", name: "陆良县", level: "area" },
                    { code: "530323", name: "师宗县", level: "area" },
                    { code: "530324", name: "罗平县", level: "area" },
                    { code: "530325", name: "富源县", level: "area" },
                    { code: "530326", name: "会泽县", level: "area" },
                    { code: "530328", name: "沾益县", level: "area" },
                    { code: "530381", name: "宣威市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "530300", name: "曲靖市", level: "city"
            },
            {
                children: [
                    { code: "530402", name: "红塔区", level: "area" },
                    { code: "530421", name: "江川县", level: "area" },
                    { code: "530422", name: "澄江县", level: "area" },
                    { code: "530423", name: "通海县", level: "area" },
                    { code: "530424", name: "华宁县", level: "area" },
                    { code: "530425", name: "易门县", level: "area" },
                    { code: "530426", name: "峨山彝族自治县", level: "area" },
                    { code: "530427", name: "新平彝族傣族自治县", level: "area" },
                    { code: "530428", name: "元江哈尼族彝族傣族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "530400", name: "玉溪市", level: "city"
            },
            {
                children: [
                    { code: "530502", name: "隆阳区", level: "area" },
                    { code: "530521", name: "施甸县", level: "area" },
                    { code: "530522", name: "腾冲县", level: "area" },
                    { code: "530523", name: "龙陵县", level: "area" },
                    { code: "530524", name: "昌宁县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "530500", name: "保山市", level: "city"
            },
            {
                children: [
                    { code: "530602", name: "昭阳区", level: "area" },
                    { code: "530621", name: "鲁甸县", level: "area" },
                    { code: "530622", name: "巧家县", level: "area" },
                    { code: "530623", name: "盐津县", level: "area" },
                    { code: "530624", name: "大关县", level: "area" },
                    { code: "530625", name: "永善县", level: "area" },
                    { code: "530626", name: "绥江县", level: "area" },
                    { code: "530627", name: "镇雄县", level: "area" },
                    { code: "530628", name: "彝良县", level: "area" },
                    { code: "530629", name: "威信县", level: "area" },
                    { code: "530630", name: "水富县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "530600", name: "昭通市", level: "city"
            },
            {
                children: [
                    { code: "530702", name: "古城区", level: "area" },
                    { code: "530721", name: "玉龙纳西族自治县", level: "area" },
                    { code: "530722", name: "永胜县", level: "area" },
                    { code: "530723", name: "华坪县", level: "area" },
                    { code: "530724", name: "宁蒗彝族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "530700", name: "丽江市", level: "city"
            },
            {
                children: [
                    { code: "530802", name: "思茅区", level: "area" },
                    { code: "530821", name: "宁洱哈尼族彝族自治县", level: "area" },
                    { code: "530822", name: "墨江哈尼族自治县", level: "area" },
                    { code: "530823", name: "景东彝族自治县", level: "area" },
                    { code: "530824", name: "景谷傣族彝族自治县", level: "area" },
                    { code: "530825", name: "镇沅彝族哈尼族拉祜族自治县", level: "area" },
                    { code: "530826", name: "江城哈尼族彝族自治县", level: "area" },
                    { code: "530827", name: "孟连傣族拉祜族佤族自治县", level: "area" },
                    { code: "530828", name: "澜沧拉祜族自治县", level: "area" },
                    { code: "530829", name: "西盟佤族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "530800", name: "普洱市", level: "city"
            },
            {
                children: [
                    { code: "530902", name: "临翔区", level: "area" },
                    { code: "530921", name: "凤庆县", level: "area" },
                    { code: "530922", name: "云县", level: "area" },
                    { code: "530923", name: "永德县", level: "area" },
                    { code: "530924", name: "镇康县", level: "area" },
                    { code: "530925", name: "双江拉祜族佤族布朗族傣族自治县", level: "area" },
                    { code: "530926", name: "耿马傣族佤族自治县", level: "area" },
                    { code: "530927", name: "沧源佤族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "530900", name: "临沧市", level: "city"
            },
            {
                children: [
                    { code: "532301", name: "楚雄市", level: "area" },
                    { code: "532322", name: "双柏县", level: "area" },
                    { code: "532323", name: "牟定县", level: "area" },
                    { code: "532324", name: "南华县", level: "area" },
                    { code: "532325", name: "姚安县", level: "area" },
                    { code: "532326", name: "大姚县", level: "area" },
                    { code: "532327", name: "永仁县", level: "area" },
                    { code: "532328", name: "元谋县", level: "area" },
                    { code: "532329", name: "武定县", level: "area" },
                    { code: "532331", name: "禄丰县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "532300", name: "楚雄彝族自治州", level: "city"
            },
            {
                children: [
                    { code: "532501", name: "个旧市", level: "area" },
                    { code: "532502", name: "开远市", level: "area" },
                    { code: "532503", name: "蒙自市", level: "area" },
                    { code: "532504", name: "弥勒市", level: "area" },
                    { code: "532523", name: "屏边苗族自治县", level: "area" },
                    { code: "532524", name: "建水县", level: "area" },
                    { code: "532525", name: "石屏县", level: "area" },
                    { code: "532527", name: "泸西县", level: "area" },
                    { code: "532528", name: "元阳县", level: "area" },
                    { code: "532529", name: "红河县", level: "area" },
                    { code: "532530", name: "金平苗族瑶族傣族自治县", level: "area" },
                    { code: "532531", name: "绿春县", level: "area" },
                    { code: "532532", name: "河口瑶族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "532500", name: "红河哈尼族彝族自治州", level: "city"
            },
            {
                children: [
                    { code: "532601", name: "文山市", level: "area" },
                    { code: "532622", name: "砚山县", level: "area" },
                    { code: "532623", name: "西畴县", level: "area" },
                    { code: "532624", name: "麻栗坡县", level: "area" },
                    { code: "532625", name: "马关县", level: "area" },
                    { code: "532626", name: "丘北县", level: "area" },
                    { code: "532627", name: "广南县", level: "area" },
                    { code: "532628", name: "富宁县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "532600", name: "文山壮族苗族自治州", level: "city"
            },
            {
                children: [
                    { code: "532801", name: "景洪市", level: "area" },
                    { code: "532822", name: "勐海县", level: "area" },
                    { code: "532823", name: "勐腊县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "532800", name: "西双版纳傣族自治州", level: "city"
            },
            {
                children: [
                    { code: "532901", name: "大理市", level: "area" },
                    { code: "532922", name: "漾濞彝族自治县", level: "area" },
                    { code: "532923", name: "祥云县", level: "area" },
                    { code: "532924", name: "宾川县", level: "area" },
                    { code: "532925", name: "弥渡县", level: "area" },
                    { code: "532926", name: "南涧彝族自治县", level: "area" },
                    { code: "532927", name: "巍山彝族回族自治县", level: "area" },
                    { code: "532928", name: "永平县", level: "area" },
                    { code: "532929", name: "云龙县", level: "area" },
                    { code: "532930", name: "洱源县", level: "area" },
                    { code: "532931", name: "剑川县", level: "area" },
                    { code: "532932", name: "鹤庆县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "532900", name: "大理白族自治州", level: "city"
            },
            {
                children: [
                    { code: "533102", name: "瑞丽市", level: "area" },
                    { code: "533103", name: "芒市", level: "area" },
                    { code: "533122", name: "梁河县", level: "area" },
                    { code: "533123", name: "盈江县", level: "area" },
                    { code: "533124", name: "陇川县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "533100", name: "德宏傣族景颇族自治州", level: "city"
            },
            {
                children: [
                    { code: "533321", name: "泸水县", level: "area" },
                    { code: "533323", name: "福贡县", level: "area" },
                    { code: "533324", name: "贡山独龙族怒族自治县", level: "area" },
                    { code: "533325", name: "兰坪白族普米族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "533300", name: "怒江傈僳族自治州", level: "city"
            },
            {
                children: [
                    { code: "533421", name: "香格里拉县", level: "area" },
                    { code: "533422", name: "德钦县", level: "area" },
                    { code: "533423", name: "维西傈僳族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "533400", name: "迪庆藏族自治州", level: "city"
            }
        ], code: "530000", name: "云南省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "540102", name: "城关区", level: "area" },
                    { code: "540121", name: "林周县", level: "area" },
                    { code: "540122", name: "当雄县", level: "area" },
                    { code: "540123", name: "尼木县", level: "area" },
                    { code: "540124", name: "曲水县", level: "area" },
                    { code: "540125", name: "堆龙德庆县", level: "area" },
                    { code: "540126", name: "达孜县", level: "area" },
                    { code: "540127", name: "墨竹工卡县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "540100", name: "拉萨市", level: "city"
            },
            {
                children: [
                    { code: "542121", name: "昌都县", level: "area" },
                    { code: "542122", name: "江达县", level: "area" },
                    { code: "542123", name: "贡觉县", level: "area" },
                    { code: "542124", name: "类乌齐县", level: "area" },
                    { code: "542125", name: "丁青县", level: "area" },
                    { code: "542126", name: "察雅县", level: "area" },
                    { code: "542127", name: "八宿县", level: "area" },
                    { code: "542128", name: "左贡县", level: "area" },
                    { code: "542129", name: "芒康县", level: "area" },
                    { code: "542132", name: "洛隆县", level: "area" },
                    { code: "542133", name: "边坝县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "542100", name: "昌都地区", level: "city"
            },
            {
                children: [
                    { code: "542221", name: "乃东县", level: "area" },
                    { code: "542222", name: "扎囊县", level: "area" },
                    { code: "542223", name: "贡嘎县", level: "area" },
                    { code: "542224", name: "桑日县", level: "area" },
                    { code: "542225", name: "琼结县", level: "area" },
                    { code: "542226", name: "曲松县", level: "area" },
                    { code: "542227", name: "措美县", level: "area" },
                    { code: "542228", name: "洛扎县", level: "area" },
                    { code: "542229", name: "加查县", level: "area" },
                    { code: "542231", name: "隆子县", level: "area" },
                    { code: "542232", name: "错那县", level: "area" },
                    { code: "542233", name: "浪卡子县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "542200", name: "山南地区", level: "city"
            },
            {
                children: [
                    { code: "542301", name: "日喀则市", level: "area" },
                    { code: "542322", name: "南木林县", level: "area" },
                    { code: "542323", name: "江孜县", level: "area" },
                    { code: "542324", name: "定日县", level: "area" },
                    { code: "542325", name: "萨迦县", level: "area" },
                    { code: "542326", name: "拉孜县", level: "area" },
                    { code: "542327", name: "昂仁县", level: "area" },
                    { code: "542328", name: "谢通门县", level: "area" },
                    { code: "542329", name: "白朗县", level: "area" },
                    { code: "542330", name: "仁布县", level: "area" },
                    { code: "542331", name: "康马县", level: "area" },
                    { code: "542332", name: "定结县", level: "area" },
                    { code: "542333", name: "仲巴县", level: "area" },
                    { code: "542334", name: "亚东县", level: "area" },
                    { code: "542335", name: "吉隆县", level: "area" },
                    { code: "542336", name: "聂拉木县", level: "area" },
                    { code: "542337", name: "萨嘎县", level: "area" },
                    { code: "542338", name: "岗巴县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "542300", name: "日喀则地区", level: "city"
            },
            {
                children: [
                    { code: "542421", name: "那曲县", level: "area" },
                    { code: "542422", name: "嘉黎县", level: "area" },
                    { code: "542423", name: "比如县", level: "area" },
                    { code: "542424", name: "聂荣县", level: "area" },
                    { code: "542425", name: "安多县", level: "area" },
                    { code: "542426", name: "申扎县", level: "area" },
                    { code: "542427", name: "索县", level: "area" },
                    { code: "542428", name: "班戈县", level: "area" },
                    { code: "542429", name: "巴青县", level: "area" },
                    { code: "542430", name: "尼玛县", level: "area" },
                    { code: "542431", name: "双湖县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "542400", name: "那曲地区", level: "city"
            },
            {
                children: [
                    { code: "542521", name: "普兰县", level: "area" },
                    { code: "542522", name: "札达县", level: "area" },
                    { code: "542523", name: "噶尔县", level: "area" },
                    { code: "542524", name: "日土县", level: "area" },
                    { code: "542525", name: "革吉县", level: "area" },
                    { code: "542526", name: "改则县", level: "area" },
                    { code: "542527", name: "措勤县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "542500", name: "阿里地区", level: "city"
            },
            {
                children: [
                    { code: "542621", name: "林芝县", level: "area" },
                    { code: "542622", name: "工布江达县", level: "area" },
                    { code: "542623", name: "米林县", level: "area" },
                    { code: "542624", name: "墨脱县", level: "area" },
                    { code: "542625", name: "波密县", level: "area" },
                    { code: "542626", name: "察隅县", level: "area" },
                    { code: "542627", name: "朗县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "542600", name: "林芝地区", level: "city"
            }
        ], code: "540000", name: "西藏自治区", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "610102", name: "新城区", level: "area" },
                    { code: "610103", name: "碑林区", level: "area" },
                    { code: "610104", name: "莲湖区", level: "area" },
                    { code: "610111", name: "灞桥区", level: "area" },
                    { code: "610112", name: "未央区", level: "area" },
                    { code: "610113", name: "雁塔区", level: "area" },
                    { code: "610114", name: "阎良区", level: "area" },
                    { code: "610115", name: "临潼区", level: "area" },
                    { code: "610116", name: "长安区", level: "area" },
                    { code: "610122", name: "蓝田县", level: "area" },
                    { code: "610124", name: "周至县", level: "area" },
                    { code: "610125", name: "户县", level: "area" },
                    { code: "610126", name: "高陵县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "610100", name: "西安市", level: "city"
            },
            {
                children: [
                    { code: "610202", name: "王益区", level: "area" },
                    { code: "610203", name: "印台区", level: "area" },
                    { code: "610204", name: "耀州区", level: "area" },
                    { code: "610222", name: "宜君县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "610200", name: "铜川市", level: "city"
            },
            {
                children: [
                    { code: "610302", name: "渭滨区", level: "area" },
                    { code: "610303", name: "金台区", level: "area" },
                    { code: "610304", name: "陈仓区", level: "area" },
                    { code: "610322", name: "凤翔县", level: "area" },
                    { code: "610323", name: "岐山县", level: "area" },
                    { code: "610324", name: "扶风县", level: "area" },
                    { code: "610326", name: "眉县", level: "area" },
                    { code: "610327", name: "陇县", level: "area" },
                    { code: "610328", name: "千阳县", level: "area" },
                    { code: "610329", name: "麟游县", level: "area" },
                    { code: "610330", name: "凤县", level: "area" },
                    { code: "610331", name: "太白县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "610300", name: "宝鸡市", level: "city"
            },
            {
                children: [
                    { code: "610402", name: "秦都区", level: "area" },
                    { code: "610403", name: "杨陵区", level: "area" },
                    { code: "610404", name: "渭城区", level: "area" },
                    { code: "610422", name: "三原县", level: "area" },
                    { code: "610423", name: "泾阳县", level: "area" },
                    { code: "610424", name: "乾县", level: "area" },
                    { code: "610425", name: "礼泉县", level: "area" },
                    { code: "610426", name: "永寿县", level: "area" },
                    { code: "610427", name: "彬县", level: "area" },
                    { code: "610428", name: "长武县", level: "area" },
                    { code: "610429", name: "旬邑县", level: "area" },
                    { code: "610430", name: "淳化县", level: "area" },
                    { code: "610431", name: "武功县", level: "area" },
                    { code: "610481", name: "兴平市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "610400", name: "咸阳市", level: "city"
            },
            {
                children: [
                    { code: "610502", name: "临渭区", level: "area" },
                    { code: "610521", name: "华县", level: "area" },
                    { code: "610522", name: "潼关县", level: "area" },
                    { code: "610523", name: "大荔县", level: "area" },
                    { code: "610524", name: "合阳县", level: "area" },
                    { code: "610525", name: "澄城县", level: "area" },
                    { code: "610526", name: "蒲城县", level: "area" },
                    { code: "610527", name: "白水县", level: "area" },
                    { code: "610528", name: "富平县", level: "area" },
                    { code: "610581", name: "韩城市", level: "area" },
                    { code: "610582", name: "华阴市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "610500", name: "渭南市", level: "city"
            },
            {
                children: [
                    { code: "610602", name: "宝塔区", level: "area" },
                    { code: "610621", name: "延长县", level: "area" },
                    { code: "610622", name: "延川县", level: "area" },
                    { code: "610623", name: "子长县", level: "area" },
                    { code: "610624", name: "安塞县", level: "area" },
                    { code: "610625", name: "志丹县", level: "area" },
                    { code: "610626", name: "吴起县", level: "area" },
                    { code: "610627", name: "甘泉县", level: "area" },
                    { code: "610628", name: "富县", level: "area" },
                    { code: "610629", name: "洛川县", level: "area" },
                    { code: "610630", name: "宜川县", level: "area" },
                    { code: "610631", name: "黄龙县", level: "area" },
                    { code: "610632", name: "黄陵县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "610600", name: "延安市", level: "city"
            },
            {
                children: [
                    { code: "610702", name: "汉台区", level: "area" },
                    { code: "610721", name: "南郑县", level: "area" },
                    { code: "610722", name: "城固县", level: "area" },
                    { code: "610723", name: "洋县", level: "area" },
                    { code: "610724", name: "西乡县", level: "area" },
                    { code: "610725", name: "勉县", level: "area" },
                    { code: "610726", name: "宁强县", level: "area" },
                    { code: "610727", name: "略阳县", level: "area" },
                    { code: "610728", name: "镇巴县", level: "area" },
                    { code: "610729", name: "留坝县", level: "area" },
                    { code: "610730", name: "佛坪县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "610700", name: "汉中市", level: "city"
            },
            {
                children: [
                    { code: "610802", name: "榆阳区", level: "area" },
                    { code: "610821", name: "神木县", level: "area" },
                    { code: "610822", name: "府谷县", level: "area" },
                    { code: "610823", name: "横山县", level: "area" },
                    { code: "610824", name: "靖边县", level: "area" },
                    { code: "610825", name: "定边县", level: "area" },
                    { code: "610826", name: "绥德县", level: "area" },
                    { code: "610827", name: "米脂县", level: "area" },
                    { code: "610828", name: "佳县", level: "area" },
                    { code: "610829", name: "吴堡县", level: "area" },
                    { code: "610830", name: "清涧县", level: "area" },
                    { code: "610831", name: "子洲县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "610800", name: "榆林市", level: "city"
            },
            {
                children: [
                    { code: "610902", name: "汉滨区", level: "area" },
                    { code: "610921", name: "汉阴县", level: "area" },
                    { code: "610922", name: "石泉县", level: "area" },
                    { code: "610923", name: "宁陕县", level: "area" },
                    { code: "610924", name: "紫阳县", level: "area" },
                    { code: "610925", name: "岚皋县", level: "area" },
                    { code: "610926", name: "平利县", level: "area" },
                    { code: "610927", name: "镇坪县", level: "area" },
                    { code: "610928", name: "旬阳县", level: "area" },
                    { code: "610929", name: "白河县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "610900", name: "安康市", level: "city"
            },
            {
                children: [
                    { code: "611002", name: "商州区", level: "area" },
                    { code: "611021", name: "洛南县", level: "area" },
                    { code: "611022", name: "丹凤县", level: "area" },
                    { code: "611023", name: "商南县", level: "area" },
                    { code: "611024", name: "山阳县", level: "area" },
                    { code: "611025", name: "镇安县", level: "area" },
                    { code: "611026", name: "柞水县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "611000", name: "商洛市", level: "city"
            }
        ], code: "610000", name: "陕西省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "620102", name: "城关区", level: "area" },
                    { code: "620103", name: "七里河区", level: "area" },
                    { code: "620104", name: "西固区", level: "area" },
                    { code: "620105", name: "安宁区", level: "area" },
                    { code: "620111", name: "红古区", level: "area" },
                    { code: "620121", name: "永登县", level: "area" },
                    { code: "620122", name: "皋兰县", level: "area" },
                    { code: "620123", name: "榆中县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "620100", name: "兰州市", level: "city"
            },
            {
                children: [
                    { code: "620202", name: "雄关区", level: "area" },
                    { code: "620203", name: "长城区", level: "area" },
                    { code: "620204", name: "镜铁区", level: "area" },
                ], code: "620200", name: "嘉峪关市", level: "city"
            },
            {
                children: [
                    { code: "620302", name: "金川区", level: "area" },
                    { code: "620321", name: "永昌县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "620300", name: "金昌市", level: "city"
            },
            {
                children: [
                    { code: "620402", name: "白银区", level: "area" },
                    { code: "620403", name: "平川区", level: "area" },
                    { code: "620421", name: "靖远县", level: "area" },
                    { code: "620422", name: "会宁县", level: "area" },
                    { code: "620423", name: "景泰县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "620400", name: "白银市", level: "city"
            },
            {
                children: [
                    { code: "620502", name: "秦州区", level: "area" },
                    { code: "620503", name: "麦积区", level: "area" },
                    { code: "620521", name: "清水县", level: "area" },
                    { code: "620522", name: "秦安县", level: "area" },
                    { code: "620523", name: "甘谷县", level: "area" },
                    { code: "620524", name: "武山县", level: "area" },
                    { code: "620525", name: "张家川回族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "620500", name: "天水市", level: "city"
            },
            {
                children: [
                    { code: "620602", name: "凉州区", level: "area" },
                    { code: "620621", name: "民勤县", level: "area" },
                    { code: "620622", name: "古浪县", level: "area" },
                    { code: "620623", name: "天祝藏族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "620600", name: "武威市", level: "city"
            },
            {
                children: [
                    { code: "620702", name: "甘州区", level: "area" },
                    { code: "620721", name: "肃南裕固族自治县", level: "area" },
                    { code: "620722", name: "民乐县", level: "area" },
                    { code: "620723", name: "临泽县", level: "area" },
                    { code: "620724", name: "高台县", level: "area" },
                    { code: "620725", name: "山丹县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "620700", name: "张掖市", level: "city"
            },
            {
                children: [
                    { code: "620802", name: "崆峒区", level: "area" },
                    { code: "620821", name: "泾川县", level: "area" },
                    { code: "620822", name: "灵台县", level: "area" },
                    { code: "620823", name: "崇信县", level: "area" },
                    { code: "620824", name: "华亭县", level: "area" },
                    { code: "620825", name: "庄浪县", level: "area" },
                    { code: "620826", name: "静宁县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "620800", name: "平凉市", level: "city"
            },
            {
                children: [
                    { code: "620902", name: "肃州区", level: "area" },
                    { code: "620921", name: "金塔县", level: "area" },
                    { code: "620922", name: "瓜州县", level: "area" },
                    { code: "620923", name: "肃北蒙古族自治县", level: "area" },
                    { code: "620924", name: "阿克塞哈萨克族自治县", level: "area" },
                    { code: "620981", name: "玉门市", level: "area" },
                    { code: "620982", name: "敦煌市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "620900", name: "酒泉市", level: "city"
            },
            {
                children: [
                    { code: "621002", name: "西峰区", level: "area" },
                    { code: "621021", name: "庆城县", level: "area" },
                    { code: "621022", name: "环县", level: "area" },
                    { code: "621023", name: "华池县", level: "area" },
                    { code: "621024", name: "合水县", level: "area" },
                    { code: "621025", name: "正宁县", level: "area" },
                    { code: "621026", name: "宁县", level: "area" },
                    { code: "621027", name: "镇原县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "621000", name: "庆阳市", level: "city"
            },
            {
                children: [
                    { code: "621102", name: "安定区", level: "area" },
                    { code: "621121", name: "通渭县", level: "area" },
                    { code: "621122", name: "陇西县", level: "area" },
                    { code: "621123", name: "渭源县", level: "area" },
                    { code: "621124", name: "临洮县", level: "area" },
                    { code: "621125", name: "漳县", level: "area" },
                    { code: "621126", name: "岷县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "621100", name: "定西市", level: "city"
            },
            {
                children: [
                    { code: "621202", name: "武都区", level: "area" },
                    { code: "621221", name: "成县", level: "area" },
                    { code: "621222", name: "文县", level: "area" },
                    { code: "621223", name: "宕昌县", level: "area" },
                    { code: "621224", name: "康县", level: "area" },
                    { code: "621225", name: "西和县", level: "area" },
                    { code: "621226", name: "礼县", level: "area" },
                    { code: "621227", name: "徽县", level: "area" },
                    { code: "621228", name: "两当县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "621200", name: "陇南市", level: "city"
            },
            {
                children: [
                    { code: "622901", name: "临夏市", level: "area" },
                    { code: "622921", name: "临夏县", level: "area" },
                    { code: "622922", name: "康乐县", level: "area" },
                    { code: "622923", name: "永靖县", level: "area" },
                    { code: "622924", name: "广河县", level: "area" },
                    { code: "622925", name: "和政县", level: "area" },
                    { code: "622926", name: "东乡族自治县", level: "area" },
                    { code: "622927", name: "积石山保安族东乡族撒拉族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "622900", name: "临夏回族自治州", level: "city"
            },
            {
                children: [
                    { code: "623001", name: "合作市", level: "area" },
                    { code: "623021", name: "临潭县", level: "area" },
                    { code: "623022", name: "卓尼县", level: "area" },
                    { code: "623023", name: "舟曲县", level: "area" },
                    { code: "623024", name: "迭部县", level: "area" },
                    { code: "623025", name: "玛曲县", level: "area" },
                    { code: "623026", name: "碌曲县", level: "area" },
                    { code: "623027", name: "夏河县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "623000", name: "甘南藏族自治州", level: "city"
            }
        ], code: "620000", name: "甘肃省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "630102", name: "城东区", level: "area" },
                    { code: "630103", name: "城中区", level: "area" },
                    { code: "630104", name: "城西区", level: "area" },
                    { code: "630105", name: "城北区", level: "area" },
                    { code: "630121", name: "大通回族土族自治县", level: "area" },
                    { code: "630122", name: "湟中县", level: "area" },
                    { code: "630123", name: "湟源县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "630100", name: "西宁市", level: "city"
            },
            {
                children: [
                    { code: "630202", name: "乐都区", level: "area" },
                    { code: "630221", name: "平安县", level: "area" },
                    { code: "630222", name: "民和回族土族自治县", level: "area" },
                    { code: "630223", name: "互助土族自治县", level: "area" },
                    { code: "630224", name: "化隆回族自治县", level: "area" },
                    { code: "630225", name: "循化撒拉族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "630200", name: "海东市", level: "city"
            },
            {
                children: [
                    { code: "632221", name: "门源回族自治县", level: "area" },
                    { code: "632222", name: "祁连县", level: "area" },
                    { code: "632223", name: "海晏县", level: "area" },
                    { code: "632224", name: "刚察县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "632200", name: "海北藏族自治州", level: "city"
            },
            {
                children: [
                    { code: "632321", name: "同仁县", level: "area" },
                    { code: "632322", name: "尖扎县", level: "area" },
                    { code: "632323", name: "泽库县", level: "area" },
                    { code: "632324", name: "河南蒙古族自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "632300", name: "黄南藏族自治州", level: "city"
            },
            {
                children: [
                    { code: "632521", name: "共和县", level: "area" },
                    { code: "632522", name: "同德县", level: "area" },
                    { code: "632523", name: "贵德县", level: "area" },
                    { code: "632524", name: "兴海县", level: "area" },
                    { code: "632525", name: "贵南县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "632500", name: "海南藏族自治州", level: "city"
            },
            {
                children: [
                    { code: "632621", name: "玛沁县", level: "area" },
                    { code: "632622", name: "班玛县", level: "area" },
                    { code: "632623", name: "甘德县", level: "area" },
                    { code: "632624", name: "达日县", level: "area" },
                    { code: "632625", name: "久治县", level: "area" },
                    { code: "632626", name: "玛多县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "632600", name: "果洛藏族自治州", level: "city"
            },
            {
                children: [
                    { code: "632701", name: "玉树市", level: "area" },
                    { code: "632722", name: "杂多县", level: "area" },
                    { code: "632723", name: "称多县", level: "area" },
                    { code: "632724", name: "治多县", level: "area" },
                    { code: "632725", name: "囊谦县", level: "area" },
                    { code: "632726", name: "曲麻莱县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "632700", name: "玉树藏族自治州", level: "city"
            },
            {
                children: [
                    { code: "632801", name: "格尔木市", level: "area" },
                    { code: "632802", name: "德令哈市", level: "area" },
                    { code: "632821", name: "乌兰县", level: "area" },
                    { code: "632822", name: "都兰县", level: "area" },
                    { code: "632823", name: "天峻县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "632800", name: "海西蒙古族藏族自治州", level: "city"
            }
        ], code: "630000", name: "青海省", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "640104", name: "兴庆区", level: "area" },
                    { code: "640105", name: "西夏区", level: "area" },
                    { code: "640106", name: "金凤区", level: "area" },
                    { code: "640121", name: "永宁县", level: "area" },
                    { code: "640122", name: "贺兰县", level: "area" },
                    { code: "640181", name: "灵武市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "640100", name: "银川市", level: "city"
            },
            {
                children: [
                    { code: "640202", name: "大武口区", level: "area" },
                    { code: "640205", name: "惠农区", level: "area" },
                    { code: "640221", name: "平罗县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "640200", name: "石嘴山市", level: "city"
            },
            {
                children: [
                    { code: "640302", name: "利通区", level: "area" },
                    { code: "640303", name: "红寺堡区", level: "area" },
                    { code: "640323", name: "盐池县", level: "area" },
                    { code: "640324", name: "同心县", level: "area" },
                    { code: "640381", name: "青铜峡市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "640300", name: "吴忠市", level: "city"
            },
            {
                children: [
                    { code: "640402", name: "原州区", level: "area" },
                    { code: "640422", name: "西吉县", level: "area" },
                    { code: "640423", name: "隆德县", level: "area" },
                    { code: "640424", name: "泾源县", level: "area" },
                    { code: "640425", name: "彭阳县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "640400", name: "固原市", level: "city"
            },
            {
                children: [
                    { code: "640502", name: "沙坡头区", level: "area" },
                    { code: "640521", name: "中宁县", level: "area" },
                    { code: "640522", name: "海原县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "640500", name: "中卫市", level: "city"
            }
        ], code: "640000", name: "宁夏回族自治区", level: "province"
    },
    {
        children: [
            {
                children: [
                    { code: "650102", name: "天山区", level: "area" },
                    { code: "650103", name: "沙依巴克区", level: "area" },
                    { code: "650104", name: "新市区", level: "area" },
                    { code: "650105", name: "水磨沟区", level: "area" },
                    { code: "650106", name: "头屯河区", level: "area" },
                    { code: "650107", name: "达坂城区", level: "area" },
                    { code: "650109", name: "米东区", level: "area" },
                    { code: "650121", name: "乌鲁木齐县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "650100", name: "乌鲁木齐市", level: "city"
            },
            {
                children: [
                    { code: "650202", name: "独山子区", level: "area" },
                    { code: "650203", name: "克拉玛依区", level: "area" },
                    { code: "650204", name: "白碱滩区", level: "area" },
                    { code: "650205", name: "乌尔禾区", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "650200", name: "克拉玛依市", level: "city"
            },
            {
                children: [
                    { code: "652101", name: "吐鲁番市", level: "area" },
                    { code: "652122", name: "鄯善县", level: "area" },
                    { code: "652123", name: "托克逊县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "652100", name: "吐鲁番地区", level: "city"
            },
            {
                children: [
                    { code: "652201", name: "哈密市", level: "area" },
                    { code: "652222", name: "巴里坤哈萨克自治县", level: "area" },
                    { code: "652223", name: "伊吾县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "652200", name: "哈密地区", level: "city"
            },
            {
                children: [
                    { code: "652301", name: "昌吉市", level: "area" },
                    { code: "652302", name: "阜康市", level: "area" },
                    { code: "652323", name: "呼图壁县", level: "area" },
                    { code: "652324", name: "玛纳斯县", level: "area" },
                    { code: "652325", name: "奇台县", level: "area" },
                    { code: "652327", name: "吉木萨尔县", level: "area" },
                    { code: "652328", name: "木垒哈萨克自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "652300", name: "昌吉回族自治州", level: "city"
            },
            {
                children: [
                    { code: "652701", name: "博乐市", level: "area" },
                    { code: "652702", name: "阿拉山口市", level: "area" },
                    { code: "652722", name: "精河县", level: "area" },
                    { code: "652723", name: "温泉县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "652700", name: "博尔塔拉蒙古自治州", level: "city"
            },
            {
                children: [
                    { code: "652801", name: "库尔勒市", level: "area" },
                    { code: "652822", name: "轮台县", level: "area" },
                    { code: "652823", name: "尉犁县", level: "area" },
                    { code: "652824", name: "若羌县", level: "area" },
                    { code: "652825", name: "且末县", level: "area" },
                    { code: "652826", name: "焉耆回族自治县", level: "area" },
                    { code: "652827", name: "和静县", level: "area" },
                    { code: "652828", name: "和硕县", level: "area" },
                    { code: "652829", name: "博湖县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "652800", name: "巴音郭楞蒙古自治州", level: "city"
            },
            {
                children: [
                    { code: "652901", name: "阿克苏市", level: "area" },
                    { code: "652922", name: "温宿县", level: "area" },
                    { code: "652923", name: "库车县", level: "area" },
                    { code: "652924", name: "沙雅县", level: "area" },
                    { code: "652925", name: "新和县", level: "area" },
                    { code: "652926", name: "拜城县", level: "area" },
                    { code: "652927", name: "乌什县", level: "area" },
                    { code: "652928", name: "阿瓦提县", level: "area" },
                    { code: "652929", name: "柯坪县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "652900", name: "阿克苏地区", level: "city"
            },
            {
                children: [
                    { code: "653001", name: "阿图什市", level: "area" },
                    { code: "653022", name: "阿克陶县", level: "area" },
                    { code: "653023", name: "阿合奇县", level: "area" },
                    { code: "653024", name: "乌恰县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "653000", name: "克孜勒苏柯尔克孜自治州", level: "city"
            },
            {
                children: [
                    { code: "653101", name: "喀什市", level: "area" },
                    { code: "653121", name: "疏附县", level: "area" },
                    { code: "653122", name: "疏勒县", level: "area" },
                    { code: "653123", name: "英吉沙县", level: "area" },
                    { code: "653124", name: "泽普县", level: "area" },
                    { code: "653125", name: "莎车县", level: "area" },
                    { code: "653126", name: "叶城县", level: "area" },
                    { code: "653127", name: "麦盖提县", level: "area" },
                    { code: "653128", name: "岳普湖县", level: "area" },
                    { code: "653129", name: "伽师县", level: "area" },
                    { code: "653130", name: "巴楚县", level: "area" },
                    { code: "653131", name: "塔什库尔干塔吉克自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "653100", name: "喀什地区", level: "city"
            },
            {
                children: [
                    { code: "653201", name: "和田市", level: "area" },
                    { code: "653221", name: "和田县", level: "area" },
                    { code: "653222", name: "墨玉县", level: "area" },
                    { code: "653223", name: "皮山县", level: "area" },
                    { code: "653224", name: "洛浦县", level: "area" },
                    { code: "653225", name: "策勒县", level: "area" },
                    { code: "653226", name: "于田县", level: "area" },
                    { code: "653227", name: "民丰县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "653200", name: "和田地区", level: "city"
            },
            {
                children: [
                    { code: "654002", name: "伊宁市", level: "area" },
                    { code: "654003", name: "奎屯市", level: "area" },
                    { code: "654021", name: "伊宁县", level: "area" },
                    { code: "654022", name: "察布查尔锡伯自治县", level: "area" },
                    { code: "654023", name: "霍城县", level: "area" },
                    { code: "654024", name: "巩留县", level: "area" },
                    { code: "654025", name: "新源县", level: "area" },
                    { code: "654026", name: "昭苏县", level: "area" },
                    { code: "654027", name: "特克斯县", level: "area" },
                    { code: "654028", name: "尼勒克县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "654000", name: "伊犁哈萨克自治州", level: "city"
            },
            {
                children: [
                    { code: "654201", name: "塔城市", level: "area" },
                    { code: "654202", name: "乌苏市", level: "area" },
                    { code: "654221", name: "额敏县", level: "area" },
                    { code: "654223", name: "沙湾县", level: "area" },
                    { code: "654224", name: "托里县", level: "area" },
                    { code: "654225", name: "裕民县", level: "area" },
                    { code: "654226", name: "和布克赛尔蒙古自治县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "654200", name: "塔城地区", level: "city"
            },
            {
                children: [
                    { code: "654301", name: "阿勒泰市", level: "area" },
                    { code: "654321", name: "布尔津县", level: "area" },
                    { code: "654322", name: "富蕴县", level: "area" },
                    { code: "654323", name: "福海县", level: "area" },
                    { code: "654324", name: "哈巴河县", level: "area" },
                    { code: "654325", name: "青河县", level: "area" },
                    { code: "654326", name: "吉木乃县", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "654300", name: "阿勒泰地区", level: "city"
            },
            {
                children: [
                    { code: "659001", name: "石河子市", level: "area" },
                    { code: "659002", name: "阿拉尔市", level: "area" },
                    { code: "659003", name: "图木舒克市", level: "area" },
                    { code: "659004", name: "五家渠市", level: "area" },
                    { code: "000000", name: "无", level: "area" }
                ], code: "659000", name: "自治区直辖县级行政区划", level: "city"
            }
        ], code: "650000", name: "新疆维吾尔自治区", level: "province"
    },
    // { code: "710000", name: "台湾省" },
    // { code: "810000", name: "香港特别行政区" },
    // { code: "820000", name: "澳门特别行政区" }
];
