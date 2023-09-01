package org.justdrink.omdb.config.oauth;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum OAuth2Attributes {

    GOOGLE("google", (attributes) -> {
        MemberProfile memberProfile = new MemberProfile();
        memberProfile.setNick((String) attributes.get("name"));
        memberProfile.setEmail((String) attributes.get("email"));
        return memberProfile;
    });

    private final String registrationId;
    private final Function<Map<String, Object>, MemberProfile> of;

    OAuth2Attributes(String registrationId, Function<Map<String, Object>, MemberProfile> of) {
        this.registrationId = registrationId;
        this.of = of;
    }

    public static MemberProfile extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }



}
